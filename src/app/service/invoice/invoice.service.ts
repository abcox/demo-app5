import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  invoices = signal(MOCK_DATA);
  constructor() {}
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
