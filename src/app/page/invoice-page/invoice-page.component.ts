import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
  numberAttribute,
  computed,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject, map } from 'rxjs';
import { InvoiceListComponent } from '../../component/invoice-list/invoice-list.component';
import { InvoiceDetailComponent } from '../../component/invoice-detail/invoice-detail.component';
import { InvoiceService } from '../../service/invoice/invoice.service';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    InvoiceListComponent,
    InvoiceDetailComponent,
  ],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.scss',
})
export class InvoicePageComponent implements OnInit {
  invoiceService = inject(InvoiceService);
  invoices = this.invoiceService.invoices.asReadonly();
  displayColumns = this.invoiceService.displayColumns.asReadonly();
  invoice = computed(() =>
    this.invoices().find(invoice => invoice.id === String(this.id))
  );
  route = inject(ActivatedRoute);
  @Input({ transform: numberAttribute }) id = 0;
  ngOnInit(): void {
    const id$ = this.route.paramMap.pipe(map(params => params.get('id')));
    id$.subscribe(id => {
      console.log('id', id);
    });
  }
}
