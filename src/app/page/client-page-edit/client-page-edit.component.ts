import {
  Component,
  OnDestroy,
  Signal,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../service/client/client.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Client } from '../../../backend-api/v1';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-client-page-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './client-page-edit.component.html',
  styleUrl: './client-page-edit.component.scss',
})
export class ClientPageEditComponent implements OnDestroy {
  clientService = inject(ClientService);
  id = input.required<string>();
  formGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  });
  // todo: change to signal
  client$ = toObservable(this.id).pipe(
    tap(client => console.log(`client id: ${client}`)),
    switchMap(id => this.clientService.getById(id)),
    tap(client =>
      this.formGroup.setValue({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
      })
    ),
    tap(client => this.loading.set(false))
  );
  clientSub = this.client$.subscribe();
  loading = signal(true);
  constructor() {}
  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }
  submit() {
    console.log(
      `submit (update) client with id ${this.id()}; client (form.value):`,
      this.formGroup.value
    );
    this.clientService
      .update(this.id(), this.formGroup.value)
      .pipe(tap(response => console.log('client updated; response:', response)))
      .subscribe();
  }
}
