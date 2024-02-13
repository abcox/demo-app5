import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  Input,
  OnInit,
  numberAttribute,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject, map } from 'rxjs';
import { InvoiceListComponent } from '../../component/invoice-list/invoice-list.component';

@Component({
  selector: 'app-invoice-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    MatButtonModule,
    InvoiceListComponent,
  ],
  templateUrl: './invoice-page.component.html',
  styleUrl: './invoice-page.component.scss',
})
export class InvoicePageComponent implements OnInit {
  route = inject(ActivatedRoute);
  dataSource = MOCK_DATA;
  @Input({ transform: numberAttribute }) id = 0;
  invoice$ = new BehaviorSubject<InvoiceModel | undefined>(undefined);
  ngOnInit(): void {
    const id$ = this.route.paramMap.pipe(map(params => params.get('id')));
    id$.subscribe(id => {
      console.log('id', id);
      this.invoice$.next(
        id ? MOCK_DATA.find(invoice => invoice.id === id) : undefined
      );
    });
  }
}

export interface InvoiceModel {
  id: string;
  date: string;
  description: string;
  amount: number;
  status?: string;
  paymentDate?: string;
}

const MOCK_DATA: InvoiceModel[] = [
  {
    id: '1',
    date: '1/18/2023',
    description: 'J.Doe',
    amount: 152.55,
    paymentDate: '1/19/2023',
  },
  {
    id: '2',
    date: '1/25/2023',
    description: 'J.Doe',
    amount: 152.55,
    paymentDate: '1/25/2023',
  },
  {
    id: '3',
    date: '2/1/2023',
    description: 'J.Doe',
    amount: 152.55,
    paymentDate: '2/1/2023',
  },
  {
    id: '4',
    date: '2/8/2023',
    description: 'J.Doe',
    amount: 152.55,
    paymentDate: undefined,
  },
];
