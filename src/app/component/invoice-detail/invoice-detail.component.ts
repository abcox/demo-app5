import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, effect, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { InvoiceModel } from '../../service/invoice/invoice.service';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss',
})
export class InvoiceDetailComponent implements OnInit {
  invoice = input.required<InvoiceModel | undefined>();
  constructor() {
    /* toObservable(this.invoice).subscribe(invoice => {
      console.log('invoice', invoice);
    }); */
    effect(() => {
      console.log('invoice', this.invoice());
    });
  }
  ngOnInit(): void {
    console.log('InvoiceDetailComponent init');
  }
}
