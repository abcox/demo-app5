import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { interval } from 'rxjs/internal/observable/interval';
import { debounce, tap } from 'rxjs/operators';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    ScrollingModule,
  ],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss',
})
export class ClientPageComponent {
  form = new FormGroup({
    search: new FormControl(''),
  });
  clients = [
    {
      id: 1,
      name: 'Client 1',
      address: '1234 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      phone: '555-555-5555',
      email: 'client1@gmail.com',
    },
    {
      id: 2,
      name: 'Client 2',
      address: '1234 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      phone: '555-555-5555',
      email: 'client2@gmail.com',
    },
    {
      id: 3,
      name: 'Client 3',
      address: '1234 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      phone: '555-555-5555',
      email: 'client3@gmail.com',
    },
    {
      id: 4,
      name: 'Client 4',
      address: '1234 Main St',
      city: 'Springfield',
      state: 'IL',
      zip: '62701',
      phone: '555-555-5555',
      email: 'client4@gmail.com',
    },
  ];
  search = toSignal(
    this.form.controls.search.valueChanges.pipe(debounce(() => interval(1000)))
  );
  constructor() {
    effect(() => console.log(`search`, this.search()));
  }
  filteredClientList = computed(() =>
    this.clients.filter(client => client.name.includes(this.search() ?? ''))
  );
  resetSearch() {
    this.form.controls.search.setValue('');
  }
}
