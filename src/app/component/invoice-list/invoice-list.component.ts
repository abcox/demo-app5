import { Component, input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { InvoiceModel } from '../../service/invoice/invoice.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss',
})
export class InvoiceListComponent {
  dataSource = input.required<InvoiceModel[]>();
  displayColumns = input.required<string[]>();
}
