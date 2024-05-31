import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './dialog-confirm.component.html',
  //styleUrls: ['./dialog-confirm.component.css'],
})
export class DialogConfirmComponent /* implements OnInit */ {
  public fName!: string;
  public fIndex: any;

  constructor(private modalRef: MatDialogRef<DialogConfirmComponent>) {}

  //ngOnInit() {}

  confirm() {
    this.modalRef.close(this.fIndex);
  }
  cancel() {
    this.modalRef.close();
  }
}
