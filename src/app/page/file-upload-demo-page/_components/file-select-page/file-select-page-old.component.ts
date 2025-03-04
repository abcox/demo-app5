import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { FileStorageService } from '../../../../service/file-storage/file-storage.service';
import { tap } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-file-select-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './file-select-page-old.component.html',
  styleUrl: './file-select-page.component.scss',
})
export class FileSelectPageOldComponent {
  private fb = inject(FormBuilder);
  private fileStorageService = inject(FileStorageService);
  private router = inject(Router);
  anyChanges = signal(false);
  selectedFile: File | null = null;
  filePreview: string | null = null;

  formGroup = this.getInitForm();

  private getInitForm() {
    const form = this.fb.group({
      filename: new FormControl<string | null>(''),
    });
    return form;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.generatePreview(this.selectedFile);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const dropzone = (event.target as HTMLElement).closest('.dropzone');
    if (dropzone) {
      dropzone.classList.remove('border-blue-500', 'bg-blue-50', 'shadow-lg');
    }

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      //this.selectedFile = event.dataTransfer.files[0];
      const originalFile = event.dataTransfer.files[0];
      this.selectedFile = new File([originalFile], originalFile.name, {
        type: originalFile.type,
        lastModified: originalFile.lastModified,
      });
      this.generatePreview(this.selectedFile);
      event.dataTransfer.clearData(); // Clear the files from the drag event
    }
  }

  generatePreview(file: File) {
    console.log(`generatePreview file`, file);
    const isImageFile = file.type.startsWith('image/');
    if (isImageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        console.log(`dataUrl`, dataUrl);
        this.filePreview = dataUrl;
      };
      reader.readAsDataURL(file);
      this.anyChanges.update(() => true);
    } else {
      console.log(`setting filePreview to null`);
      this.filePreview = null; // No preview for non-image files
    }
    this.formGroup.controls.filename.patchValue(file.name);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    const dropzone = (event.target as HTMLElement).closest('.dropzone');
    if (dropzone) {
      dropzone.classList.add('border-blue-500', 'bg-blue-50', 'shadow-lg');
    }
  }

  onDragLeave(event: DragEvent) {
    const dropzone = (event.target as HTMLElement).closest('.dropzone');
    if (dropzone) {
      dropzone.classList.remove('border-blue-500', 'bg-blue-50', 'shadow-lg');
    }
  }

  uploadSelectedFile() {
    console.log(`uploadSelectedFile; selectedFile:`, this.selectedFile);
    if (!this.selectedFile || this.selectedFile === null) {
      return;
    }
    const file: File = this.selectedFile;
    const formData = new FormData();

    //formData.append(files[0].name, files[0]);
    //const filename = this.formGroup.controls.filename.value ?? file.name;
    const filename = file.name;
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
