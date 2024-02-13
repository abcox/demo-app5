import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { InvoiceModel } from '../../page/invoice-page/invoice-page.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss',
})
export class InvoiceDetailComponent implements OnInit {
  invoice$ = new BehaviorSubject<InvoiceModel | undefined>(undefined);
  @Input() set invoice(invoice: InvoiceModel | null | undefined) {
    if (!invoice) return;
    this.invoice$.next(invoice);
  }
  ngOnInit(): void {
    this.invoice$.subscribe(invoice => {
      console.log('invoice', invoice);
    });
  }
}
