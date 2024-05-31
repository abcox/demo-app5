import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogConfirmComponent } from '../../component/dialog-config/dialog-confirm.component';
import { CommonModule } from '@angular/common';
import { FileDragNDropDirective } from '../../common/directives/file-drag-n-drop.directive';
import { MatButtonModule } from '@angular/material/button';
import { ClientService } from '../../service/client/client.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-client-import-page',
  standalone: true,
  imports: [CommonModule, FileDragNDropDirective, MatButtonModule],
  templateUrl: './client-import-page.component.html',
  styleUrl: './client-import-page.component.scss',
  providers: [MatSnackBar, DialogConfirmComponent],
})
export class ClientImportPageComponent {
  clientService = inject(ClientService);
  public files: any[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  onFileChange(files: File[]) {
    console.log(`onFileChange files`, files);
    /* const pFileList = Array.isArray($event.FileList)
      ? $event
      : $event.target.files; */
    console.log(`onFileChange pFileList`, files);
    const fileNames = this.files.map((file: any) => file.name);
    const fileArr = Array.from(files).filter(
      (file: any) => !fileNames.includes(file.name)
    );
    console.log(`onFileChange fileArr`, fileArr);
    /* const fileBuff = Object.keys(files).map((key: any) =>
      fileNames.includes(files[key]?.name) ? null : files[key]
    );
    console.log(`onFileChange fileBuff`, fileBuff);
    this.files = this.files.concat(fileBuff); */
    this.files = this.files.concat(fileArr);
    this._snackBar.open(
      `${fileArr.length} new file${fileArr.length === 1 ? '' : 's'} uploaded`,
      'Close',
      {
        duration: 2000,
      }
    );
    console.log(`onFileChange this.files`, this.files);
  }

  deleteFile(f: any) {
    this.files = this.files.filter(function (w) {
      return w.name != f.name;
    });
    this._snackBar.open('Successfully delete!', 'Close', {
      duration: 2000,
    });
  }

  openConfirmDialog(pIndex: any): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      panelClass: 'modal-xs',
    });
    dialogRef.componentInstance.fName = this.files[pIndex].name;
    dialogRef.componentInstance.fIndex = pIndex;

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.deleteFromArray(result);
      }
    });
  }

  deleteFromArray(index: any) {
    console.log(this.files);
    this.files.splice(index, 1);
  }
  uploadFiles() {
    console.log(this.files);
    this.clientService
      .upload(this.files[0])
      .pipe(
        tap(response => {
          console.log(`uploadFiles response`, response);
          this._snackBar.open('Successfully uploaded!', 'Close', {
            duration: 2000,
          });
        }),
        catchError(error => {
          console.error(`uploadFiles error`, error);
          this._snackBar.open('Something went wrong uploading data', 'Close', {
            duration: 5000,
          });
          return [];
        })
      )
      .subscribe();
  }
}
