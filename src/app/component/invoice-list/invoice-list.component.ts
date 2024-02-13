import { Component, Input, numberAttribute } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { InvoiceModel } from '../../page/invoice-page/invoice-page.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss',
})
export class InvoiceListComponent {
  @Input() dataSource = [] as InvoiceModel[];
  displayColumns = [
    'date',
    'description',
    'amount' /* , 'status' */,
    'paymentDate',
  ];
}
