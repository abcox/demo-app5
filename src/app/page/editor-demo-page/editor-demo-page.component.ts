import { HttpEvent, HttpResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {
  AngularEditorModule,
  AngularEditorConfig,
  UploadResponse,
} from '@kolkov/angular-editor';
import {
  combineLatest,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { FileStorageService } from '../../service/file-storage/file-storage.service';
import {
  BrowserModule,
  DomSanitizer,
  SafeUrl,
} from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { QuillEditorComponent, QuillModule, QuillModules } from 'ngx-quill';

import Quill from 'quill';
import ImageResizor from 'quill-image-resizor';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TinyMCE } from 'tinymce';
import { DialogComponent } from './_components/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

Quill.register('modules/imageResizor', ImageResizor);

const addWidthToImagesWithGuid = (content: string, sizePx: string): string => {
  console.log(`addWidthToImagesWithGuid`);
  // Regular expression to match a GUID pattern in the src attribute
  const guidPattern = /blob:http:\/\/localhost:\d+\/([a-fA-F0-9-]+)/;

  // Get all <img> elements in the document
  const document = new DOMParser().parseFromString(content, 'text/html');
  const imgElements = document.querySelectorAll('img');

  imgElements.forEach(img => {
    const src = img.getAttribute('src');

    if (src && guidPattern.test(src)) {
      // Extract the GUID from the src using the regex match
      const match = src.match(guidPattern);

      if (match) {
        const guid = match[1]; // The matched GUID part

        console.log(`Found img with GUID: ${guid}`);

        // Add the width attribute to the image
        img.setAttribute('width', sizePx);
      }
    }
  });
  return document.documentElement.outerHTML;
};

interface ViewModel {
  content: string;
}

@Component({
  selector: 'app-editor-demo-page',
  standalone: true,
  imports: [
    AngularEditorModule,
    //BrowserAnimationsModule,
    CommonModule,
    EditorComponent, // tinymce-angular
    FormsModule, // control must be outside form and using ngModel/ngChangeEvent
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatSliderModule,
    QuillModule,
    QuillEditorComponent,
  ],
  templateUrl: './editor-demo-page.component.html',
  styleUrl: './editor-demo-page.component.scss',
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class EditorDemoPageComponent implements OnDestroy, AfterViewInit {
  sanitizer = inject(DomSanitizer);
  //private dialog = inject(MatDialog);
  //#region @kolkov/angular-editor
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    //uploadUrl: 'v1/image',
    //upload: (file: File) => this.storageService.uploadFile2('demo', file), // this.upload(file),
    upload: (file: File) => this.attachFile(file), // this.upload(file),
    /* uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ] */
  };
  vm$: Observable<ViewModel> = combineLatest([]).pipe(
    map(() => {
      return {
        content: 'test',
      };
    })
  );
  form: FormGroup = this.fb.group({
    content: [],
  });

  imageSize = 150;
  imageSizeChange$: Subject<string> = new Subject<string>();
  onImageSizeChange(newSizeValue: string): void {
    this.imageSizeChange$.next(newSizeValue); // Emit the new value
    const content = this.form.controls['content'].value;
    const updatedContent = addWidthToImagesWithGuid(content, newSizeValue);
    this.form.controls['content'].setValue(updatedContent);
  }
  //#endregion @kolkov/angular-editor

  //#region Quill
  @ViewChild('editor', { static: true }) editor!: QuillEditorComponent;
  quillModules: QuillModules = {};
  quillContent = '';
  quillEditorConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'], // Add any custom toolbar items here
        //['code-block'],
      ],
      handlers: {
        html: () => this.toggleHtmlView(),
      },
    },
    /* html: {
      container: '#html',
      handlers: {
        html: () => this.toggleHtmlView(),
      },
    }, */
    imageResizor: {},
    /* imageResize: {
      // Enable image resizing
      displayStyles: {
        backgroundColor: 'black',
        border: 'none',
        color: 'white',
      },
      modules: ['Resize', 'DisplaySize'], // Optional settings
    }, */
  };
  isHtmlView = false;
  rawHtmlContent = '';

  // Method to toggle between WYSIWYG and raw HTML view
  toggleHtmlView() {
    console.log(`toggleHtmlView`);
    const quillEditor = this.editor.quillEditor; // Access the Quill instance

    if (this.isHtmlView) {
      // If in HTML view, switch back to WYSIWYG editor
      this.isHtmlView = false;
      this.quillContent = this.rawHtmlContent; // Restore WYSIWYG content
    } else {
      // If in WYSIWYG view, switch to HTML view
      this.isHtmlView = true;
      this.rawHtmlContent = quillEditor.root.innerHTML; // Get raw HTML content
    }
  }
  //#endregion Quill

  //#region tinymce-angular
  init: EditorComponent['init'] = {
    //license_key: 'gpl',
    base_url: 'tinymce', // self-hosted requires this path to your local TinyMCE folder
    //skin_url: 'tinymce/skins/content/default',
    suffix: '.min',
    //plugins: 'lists link image table code help wordcount',
    height: 500,
    menubar: false,
    //selector: 'textarea',
    //plugin_base_urls: '',
    //theme_url: 'tinymce',
    /* plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount',
    ], */
    plugins: ['code'],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
      alignleft aligncenter alignright alignjustify | \
      bullist numlist outdent indent | removeformat | code | myCustomToolbarButton | help',
    setup: this.setup,
  };

  setup(editor: any) {
    editor.ui.registry.addButton('myCustomToolbarButton', {
      text: 'My Custom Button',
      onAction: () =>
        editor.windowManager.open({
          title: 'test',
          body: {
            type: 'panel',
            items: [
              {
                type: 'input',
                name: 'catdata',
                label: 'enter the name of a cat',
              },
              {
                type: 'checkbox',
                name: 'isdog',
                label: 'tick if cat is actually a dog',
              },
            ],
          },
        }),
      /* onAction: () => this.openDialog() {
        console.log(`My Custom Button`);
        const DialogRef = this.dialog.open(DialogComponent);
        return DialogRef.afterClosed();
      }, */
    });
  }

  openDialog() {
    const DialogRef = this.dialog.open(DialogComponent);
    return DialogRef.afterClosed();
  }
  //#endregion tinymce-angular

  constructor(
    private fb: FormBuilder,
    private fileStorageService: FileStorageService,
    private dialog: MatDialog
  ) {
    this.quillModules = {
      imageResizor: {},
      toolbar: [['formula'], ['code-block'], ['image']],
    };
  }

  ngOnInit() {
    this.imageSizeChange$.pipe(tap(value => {})).subscribe();
  }

  ngAfterViewInit(): void {
    this.form.valueChanges
      .pipe(
        //tap(values => console.log(`form valueChanges`, values)),
        filter(({ content }) => content !== undefined),
        tap(({ content }) => console.log(`form content`, content)),
        tap(({ content }) => {
          const updatedContent = addWidthToImagesWithGuid(content, '150');
          this.form.controls['content'].setValue(updatedContent);
        })
      )
      .subscribe();

    //#region quill

    //// Find the toolbar container
    //console.log(`this.editor`, this.editor);
    //const quill = this.editor.quillEditor;
    //
    //// Find the toolbar element (it's within the Quill editor instance)
    //const toolbar: any = quill.getModule('toolbar');
    //
    //// Create a custom HTML button and append it to the toolbar
    //const customButton = document.createElement('button');
    //customButton.innerHTML = 'HTML';
    //customButton.classList.add('ql-html');
    //
    //// Append the button to the toolbar DOM manually
    //toolbar.container.appendChild(customButton);
    //
    //// Add a click handler for the custom button to toggle HTML view
    //customButton.addEventListener('click', () => this.toggleHtmlView());

    //#endregion quill
  }

  ngOnDestroy() {
    // Clean up object URL when component is destroyed to avoid memory leaks
    this.attachments.forEach(attachment =>
      URL.revokeObjectURL(attachment.url as string)
    );
  }

  previewUrl: SafeUrl = '';
  attachments: { file: File; url: SafeUrl }[] = [];

  attachFile(file: File): Observable<HttpEvent<UploadResponse>> {
    //console.log(`uploadFile file:`, file);
    if (!file || file === null) {
      console.error(`file empty or null`);
      return EMPTY;
    }
    const formData = new FormData();
    const filename: string = file.name;
    if (filename === '') {
      console.error(`filename empty or null`);
      return EMPTY;
    }

    const objectUrl = URL.createObjectURL(file);
    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);

    //this.previewUrl = previewUrl;
    //URL.revokeObjectURL(objectUrl);

    const attachment = { file, url: safeUrl };
    this.attachments.push(attachment);

    const uploadResponse = {
      body: {
        imageUrl: objectUrl,
      } as UploadResponse,
    } as HttpResponse<UploadResponse>;
    return of(uploadResponse as HttpResponse<UploadResponse>);
  }

  // todo:  this approach uploads the image immediately to blob storage;
  // alt., we should provide the image path/url and keep in some local storage, and
  // upload images when user submits the content.  this could look like sending the content
  // having the path/urls of the images, and the image data along side the request whereby
  // the API would store the content/html in the cosmosdb and the images in the blob storage.
  uploadFile(file: File): Observable<HttpEvent<UploadResponse>> {
    //console.log(`uploadFile file:`, file);
    if (!file || file === null) {
      console.error(`file empty or null`);
      return EMPTY;
    }
    const formData = new FormData();
    const filename: string = file.name;
    if (filename === '') {
      console.error(`filename empty or null`);
      return EMPTY;
    }
    formData.append('file', file);
    formData.append('filename', filename);
    const response = this.fileStorageService.upload(formData).pipe(
      switchMap(({ path }) => {
        const uploadResponse = {
          body: {
            imageUrl: path,
          } as UploadResponse,
        } as HttpResponse<UploadResponse>;
        return of(uploadResponse as HttpResponse<UploadResponse>);
      })
    );
    return response;
  }

  submit() {
    console.log(`form`, this.form);
  }
}
