import { Component, Input, numberAttribute, signal } from '@angular/core';
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
  dataSource$ = signal<InvoiceModel[]>([]);
  displayColumns$ = signal<string[]>([]);
  @Input() set dataSource(dataSource: InvoiceModel[]) {
    if (!dataSource) return;
    this.dataSource$.set(dataSource);
  }
  @Input() set displayColumns(displayColumns: string[]) {
    if (!displayColumns) return;
    this.displayColumns$.set(displayColumns);
  }
}
