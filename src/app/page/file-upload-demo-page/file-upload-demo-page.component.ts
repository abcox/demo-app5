import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FileStorageService } from '../../service/file-storage/file-storage.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  EMPTY,
  map,
  Observable,
  of,
  ReplaySubject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FileListComponent,
  FileListItemModel,
} from './_components/file-list/file-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  BnMatbutTypeDirective,
  MatButtonType,
} from '../../common/directives/mat-button-type';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-file-upload-demo-page',
  standalone: true,
  imports: [
    BnMatbutTypeDirective,
    CommonModule,
    FileListComponent,
    FormsModule,
    MatInputModule, // IMPORTANT:  Forgetting to include raises ERROR: "mat-form-field must contain a MatFormFieldControl"
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './file-upload-demo-page.component.html',
  styleUrl: './file-upload-demo-page.component.scss',
  providers: [FileStorageService],
}) /* implements OnInit */
export class FileUploadDemoPageComponent implements OnDestroy, AfterViewInit {
  fb = inject(FormBuilder);
  private snackbar = inject(MatSnackBar);
  @ViewChild('fileInput') fileInput!: ElementRef;
  formGroup = this.getInitForm();
  //filename = '';
  imageSource: string | undefined;

  search$$ = new BehaviorSubject<string>('');
  files$$ = new BehaviorSubject<FileListItemModel[]>([]);
  files$ = this.files$$
    .asObservable()
    .pipe(/* tap(files => console.log(`files`, files)) */);
  selected$$ = new BehaviorSubject<FileListItemModel[]>([]);
  private _destroyed$ = new ReplaySubject<void>();

  butType = MatButtonType.flat;

  constructor(private fileStorageService: FileStorageService) {}
  ngAfterViewInit(): void {
    this.subscribeToFormValueChanges();

    this.selected$$
      .pipe(
        tap(selected => {
          //console.log(`selected`, selected);
          //console.log(`files`, this.files$$.value);
          this.anySelected.update(() => selected.length > 0);
        })
        //tap(selected => )
      )
      .subscribe();

    this.search$$
      .pipe(
        debounceTime(500),
        tap(([search]) => this.initFiles$$(search, this.files$$))
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  //ngOnInit(): void {
  //  this.formGroup = this.fb.group({
  //    filename: new FormControl<string | null>(null),
  //  });
  //}

  private getInitForm() {
    const form = this.fb.group({
      filename: new FormControl<string | null>(''),
      search: new FormControl<string | null>(null),
    });
    return form;
  }

  private subscribeToFormValueChanges() {
    this.formGroup.valueChanges
      .pipe(
        takeUntil(this._destroyed$),
        tap(values => console.log(`valueChanges`, values)),
        tap(values => this.search$$.next(values?.search ?? ''))
      )
      .subscribe();
  }

  private getMockedFiles(): Observable<FileListItemModel[]> {
    return of([
      {
        name: 'File',
        resource: 'https://vorbastore1.blob.core.windows.net/public/File',
        selected: false,
      },
      {
        name: 'JA_burger.jpg',
        resource:
          'https://vorbastore1.blob.core.windows.net/public/JA_burger.jpg',
        selected: false,
      },
      {
        name: 'morning-coffee.jpg',
        resource:
          'https://vorbastore1.blob.core.windows.net/public/morning-coffee.jpg',
        selected: false,
      },
      {
        name: 'pumpkin-face',
        resource:
          'https://vorbastore1.blob.core.windows.net/public/pumpkin-face',
        selected: false,
      },
    ]);
  }

  deleteSelected() {
    this.selected$$.value.forEach(file => this.deleteFile(file.name));

    console.log(`selected`, this.selected$$.value);
    console.log(`files`, this.files$$.value);
  }

  deleteFile(fileName: string) {
    //const fileName = this.formGroup.controls.filename.value;
    if (fileName === null) return;
    this.fileStorageService
      .delete('public', fileName)
      .pipe(
        tap(({ path }) => {
          this.imageSource = undefined;
          this.formGroup.controls.filename.patchValue(null);
          const index = this.files$$.value.findIndex(
            file => file.name === fileName
          );
          if (index) {
            this.files$$.next(this.files$$.value.splice(index, 1));
          }
        }),
        catchError(err => {
          console.error(`delete error`, err);
          this.snackbar.open('Delete failed', 'Dismiss', {
            duration: 5000,
          });
          return EMPTY;
        })
      )
      .subscribe();
  }

  getFiles$(filter: string | undefined) {
    console.log(`getFiles filter`, filter);
    return this.fileStorageService.search(filter ?? '').pipe(
      tap(response => console.log(`response`, response)),
      map(response => response?.files)
    );
  }

  initFiles$$(
    filter: string | undefined,
    files$$: BehaviorSubject<FileListItemModel[]>
  ) {
    this.getFiles$(filter)
      .pipe(
        takeUntil(this._destroyed$),
        tap(files => files$$.next(files))
      )
      .subscribe();
  }

  resetSearch() {
    this.formGroup.controls.search.patchValue('');
  }

  addFile(file: FileListItemModel) {
    this.files$$.next([file, ...this.files$$.value]);
  }

  search() {}

  setFilename(files: any) {
    if (files[0]) {
      //this.filename = files[0].name;
      this.formGroup.controls.filename.patchValue(files[0].name);
    }
  }

  //#region action button
  allSelected = signal(false);
  anySelected = signal(false);
  exportSelected() {}
  selectAll() {
    this.files$$.next(
      this.files$$.value.map(x => ({ ...x, selected: !x.selected }))
    );
    this.allSelected.update(() => !this.allSelected());
    this.anySelected.update(() => !this.anySelected());
  }
  //#endregion action button
}
