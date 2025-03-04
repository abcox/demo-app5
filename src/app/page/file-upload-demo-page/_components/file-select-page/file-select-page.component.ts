import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FileStorageService } from '../../../../service/file-storage/file-storage.service';
import { BehaviorSubject, map, startWith, tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  ImageCroppedEvent,
  ImageCropperComponent,
  ImageTransform,
  LoadedImage,
} from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import _ from 'lodash';

// ngx-image-cropper stackblitz: https://stackblitz.com/edit/image-cropper?file=src%2Fimage-cropper%2Futils%2Fblob.utils.ts

@Component({
  selector: 'app-file-select-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ImageCropperComponent,
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './file-select-page.component.html',
  styleUrl: './file-select-page.component.scss',
})
export class FileSelectPageComponent {
  private fb = inject(FormBuilder);
  private fileStorageService = inject(FileStorageService);
  private router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);
  fileSelected = signal(false);
  selectedFile: File | null = null;
  filePreview: string | null = null;

  //#region image cropper vars
  imagePreview: SafeUrl = '';
  imageChangeEvent$$ = new BehaviorSubject<Event | null>(null);
  imageChangeEvent$ = this.imageChangeEvent$$
    .asObservable()
    //.pipe(tap(event => console.log(`imageChangeEvent event`, event)))
    .subscribe();
  imageBase64: string | undefined = undefined;
  //aspectRatio = 4 / 3;
  //containWithinAspectRatio = true;
  initialCroppingControlFormValues = {
    aspectRatio: 4 / 3,
    containWithinAspectRatio: true,
    allowMoveImage: false,
  };
  croppingControlFormGroup = this.getInitCroppingControlFormGroup(
    this.initialCroppingControlFormValues
  );
  _croppingControlStateSummary = '';
  private getCroppingControlsStateSummary(values: any): string {
    //console.log(`getCroppingControlsStateSummary values`, values);
    const { aspectRatio, containWithinAspectRatio, allowMoveImage } = values;
    let summary = `${containWithinAspectRatio === true ? 'Contain' : 'Fit'} in `;
    summary += aspectRatio < 2 ? '4 by 3' : '16 by 5';
    summary += `; Panning: ${allowMoveImage === true ? 'On' : 'Off'}`;
    return summary;
  }
  croppingControlsStateSummary$ =
    this.croppingControlFormGroup.valueChanges.pipe(
      startWith(this.initialCroppingControlFormValues),
      map(values => this.getCroppingControlsStateSummary(values))
    );
  scale = 1;
  rotation = 0;
  translateH = 0;
  translateV = 0;
  canvasRotation = 0;
  transform: ImageTransform = {
    flipH: false,
    flipV: false,
    translateUnit: 'px',
  };
  initTransform = this.transform;
  //#endregion image cropper vars

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('fileInput', { static: false }) fileInputElement!: ElementRef;

  formGroup = this.getInitForm();

  /* ngAfterViewInit() {
    this.croppingControlFormGroup.valueChanges
      .pipe(tap(values => this._croppingControlStateSummary))
      .subscribe();
  } */

  //#region Image cropping
  get aspectRatio(): number {
    return this.croppingControlFormGroup.controls.aspectRatio.value ?? 4 / 3;
  }
  get containWithinAspectRatio(): boolean {
    return (
      this.croppingControlFormGroup.controls.containWithinAspectRatio.value ??
      true
    );
  }
  get allowMoveImage(): boolean {
    return this.croppingControlFormGroup.controls.allowMoveImage.value ?? true;
  }
  get croppingControlsChanged(): boolean {
    /* console.log(
      `croppingControlsUnchanged form control values (and orig values)`,
      {
        current: this.croppingControlFormGroup.value,
        orig: this.initialCroppingControlFormValues,
      }
    ); */
    /* console.log(`croppingControlsUnchanged transform values`, {
      canvasRotation: this.canvasRotation,
      rotation: this.rotation,
      scale: this.scale,
      translateH: this.translateH,
      translateV: this.translateV,
      transform: this.transform,
    }); */
    const anyImageTransformChanges =
      this.canvasRotation !== 0 ||
      this.rotation !== 0 ||
      this.scale !== 1 ||
      this.translateH !== 0 ||
      this.translateV !== 0 ||
      !_.isEqual(this.transform, this.initTransform);
    /* const anyFormChanges = _.isEqual(
      this.initialCroppingControlFormValues,
      this.croppingControlFormGroup.value
    ); */
    const anyFormChanges =
      this.initialCroppingControlFormValues.allowMoveImage !==
        this.croppingControlFormGroup.value.allowMoveImage ||
      this.initialCroppingControlFormValues.aspectRatio !==
        this.croppingControlFormGroup.value.aspectRatio ||
      this.initialCroppingControlFormValues.containWithinAspectRatio !==
        this.croppingControlFormGroup.value.containWithinAspectRatio;
    const anyChanges = anyImageTransformChanges || anyFormChanges;
    /* console.log(`croppingControlsChanged`, {
      anyFormChanges,
      anyImageTransformChanges,
      anyChanges,
    }); */
    return anyChanges;
  }
  getInitCroppingControlFormGroup(values: any) {
    const { aspectRatio, containWithinAspectRatio, allowMoveImage } = values;
    return this.fb.group({
      aspectRatio: new FormControl<number>(aspectRatio),
      containWithinAspectRatio: new FormControl<boolean>(
        containWithinAspectRatio
      ),
      allowMoveImage: new FormControl<boolean>(allowMoveImage),
    });
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(`imageCropped`, event);
    if (!event.objectUrl || event.objectUrl === null) {
      return;
    }
    console.log(`imageCropped`);
    this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // event.blob can be used to upload the cropped image

    const filename = this.filename;
    this.selectedFile = this.convertBlobToFile(event.blob, filename);
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  // Convert the Blob to a File object
  convertBlobToFile(
    blob: Blob | null | undefined,
    fileName: string
  ): File | null {
    // Here you can pass the Blob, file name, and MIME type if needed
    const result = blob
      ? new File([blob], fileName, { type: blob.type })
      : null;
    console.log(`convertBlobToFile result`, result);
    return result;
  }

  // Convert File to Base64 string
  assignFileToCropperAsBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageBase64 = reader.result as string; // Set the Base64 string
    };
    reader.readAsDataURL(file); // Read file as Data URL (Base64)
  }
  // Position (Flip & Rotate)
  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }
  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }
  rotateLeft() {
    this.rotate('left');
  }
  rotateRight() {
    this.rotate('right');
  }
  private rotate(direction: 'right' | 'left') {
    //this.loading = true; // todo: loadingPreview
    setTimeout(() => {
      // rotate canvas
      if (Math.abs(this.canvasRotation) === 3) {
        // reset canvas when outside bounds, therefore +/-4 rotations = 0
        this.canvasRotation = 0;
      } else {
        if (direction === 'right') {
          this.canvasRotation++;
        } else {
          this.canvasRotation--;
        }
      }

      // flip (after canvas rotate)
      const flippedH = this.transform.flipH;
      const flippedV = this.transform.flipV;
      this.transform = {
        ...this.transform,
        flipH: flippedV,
        flipV: flippedH,
      };
      this.translateH = 0;
      this.translateV = 0;
    });
  }
  resetCroppingControls() {
    this.croppingControlFormGroup.reset(this.initialCroppingControlFormValues);
    //this.croppingControlFormGroup = this.getInitCroppingControlFormGroup();
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {
      translateUnit: 'px',
    };
    this.transform = this.initTransform;
  }
  //#endregion Image cropping

  private getInitForm() {
    const form = this.fb.group({
      filename: new FormControl<string | null>(''),
    });
    return form;
  }

  clearSelectedFile() {
    this.selectedFile = null;
    //this.formGroup.controls.filename.patchValue(null);
    this.formGroup.reset();
    this.clearInputField();
    this.fileSelected.update(() => false);
    this.imagePreview = '';
  }

  private clearInputField2() {
    const oldInput = document.getElementById('file-upload'); // as HTMLElement;
    if (oldInput && oldInput.parentNode) {
      const newInput = oldInput.cloneNode(true) as HTMLInputElement;
      oldInput.parentNode.replaceChild(newInput, oldInput);

      // Optionally, re-attach the event listener if needed
      newInput.addEventListener('change', event => this.onFileSelected(event));
    }
  }

  private clearInputField() {
    const input = this.fileInputElement.nativeElement as HTMLInputElement;
    if (input.files && input.files[0]) {
      console.log('Selected file:', input.files[0].name);
      input.value = ''; // Clear the files from the drag event
    }
  }

  onFileSelected(event: Event) {
    console.log(`onFileSelected event`, event);
    //this.imageChangeEvent$$.next(event);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      //this.selectedFile = input.files[0];
      let originalFile = input.files[0];
      this.selectedFile = this.getFile(originalFile);
      //input.value = ''; // Clear the files from the drag event
      this.generatePreview(this.selectedFile);
      this.assignFileToCropperAsBase64(this.selectedFile);
    }
  }

  onDropZone(event: DragEvent) {
    event.preventDefault();
    //this.imageChangeEvent$$.next(event as Event);
    const dropzone = (event.target as HTMLElement).closest('.dropzone');
    if (dropzone) {
      dropzone.classList.remove('border-blue-500', 'bg-blue-50', 'shadow-lg');
    }

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      //this.selectedFile = event.dataTransfer.files[0];
      const originalFile = event.dataTransfer.files[0];
      this.selectedFile = this.getFile(originalFile);
      event.dataTransfer.clearData(); // Clear the files from the drag event
      this.generatePreview(this.selectedFile);
      this.assignFileToCropperAsBase64(this.selectedFile);
    }
  }

  private getFile(file: File) {
    return new File([file], file.name, {
      type: file.type,
      lastModified: file.lastModified,
    });
  }

  generatePreview(file: File) {
    console.log(`generatePreview file`, file);
    const isImageFile = file.type.startsWith('image/');
    if (isImageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        //console.log(`dataUrl`, dataUrl);
        this.filePreview = dataUrl;
      };
      reader.readAsDataURL(file);
      this.fileSelected.update(() => true);
    } else {
      console.log(`setting filePreview to null`);
      this.filePreview = null; // No preview for non-image files
    }
    this.formGroup.controls.filename.patchValue(file.name);
  }

  onDragOverZone(event: DragEvent) {
    event.preventDefault();
    const dropzone = (event.target as HTMLElement).closest('.dropzone');
    if (dropzone) {
      dropzone.classList.add('border-blue-500', 'bg-blue-50', 'shadow-lg');
    }
  }

  onDragLeaveZone(event: DragEvent) {
    const dropzone = (event.target as HTMLElement).closest('.dropzone');
    if (dropzone) {
      dropzone.classList.remove('border-blue-500', 'bg-blue-50', 'shadow-lg');
    }
  }

  onDragOver(event: DragEvent) {
    console.log(`onDragOver event`, event);
    event.preventDefault(); // Allow the drop
    const target = event.currentTarget as HTMLElement;
    target.classList.add('dropzone-hover'); // Add hover effect class
  }

  onDragLeave(event: DragEvent) {
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('dropzone-hover');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    /* const file = event.dataTransfer?.files[0];

    if (file) {
      this.fileName = file.name;
      this.showError = false;
    } else {
      this.showError = true;
    } */

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      //this.selectedFile = event.dataTransfer.files[0];
      const originalFile = event.dataTransfer.files[0];
      this.selectedFile = this.getFile(originalFile);
      event.dataTransfer.clearData(); // Clear the files from the drag event
      this.generatePreview(this.selectedFile);
      this.assignFileToCropperAsBase64(this.selectedFile);
    }

    const target = event.currentTarget as HTMLElement;
    target.classList.remove('dropzone-hover');
  }

  onFieldFocus(event: any) {
    if (this.fileSelected() === false) {
      event.preventDefault();
      //const fileInput = document.getElementById('file-upload') as HTMLElement;
      //fileInput.click();
      this.fileInput.nativeElement.click();
    }
  }

  randomFilename(extension: string | null = null): string {
    // Generate a random string (e.g., 6 characters)
    const randomString = Math.random().toString(36).substring(2, 8);

    // Combine the random string with the current timestamp and extension
    let tempFileName = `temp_${Date.now()}_${randomString}`;

    if (extension) {
      tempFileName += `.${extension}`;
    }

    return tempFileName;
  }

  get filename(): string {
    let filename = this.formGroup.controls.filename.value ?? '';
    console.log(`filename (form)`, filename);
    if (filename === '') {
      filename = this.randomFilename();
      console.log(`filename (random)`, filename);
    }
    console.log(`filename (result)`, filename);
    return filename;
  }

  uploadSelectedFile() {
    console.log(`uploadSelectedFile; selectedFile:`, this.selectedFile);
    if (!this.selectedFile || this.selectedFile === null) {
      console.warn(`no file selected`);
      return;
    }
    const file: File = this.selectedFile;
    const formData = new FormData();

    //formData.append(files[0].name, files[0]);
    const filename: string = this.filename; // ?? file.name;
    if (filename === '') {
      console.warn(`filename empty or null`);
      return;
    }
    //const filename = file.name;
    console.log(`filename`, filename);
    formData.append('file', file);
    formData.append('FileName', filename);

    this.fileStorageService
      .upload(formData)
      .pipe(
        tap(({ path }) => {
          /* this.addFile({
            name: filename,
            resource: path,
            selected: false,
          } as FileListItemModel);
          this.formGroup.controls.filename.patchValue(null);
          this.fileInput.nativeElement.value = null; */
          this.router.navigate(['/upload-demo']);
        })
      )
      .subscribe();
  }
}
