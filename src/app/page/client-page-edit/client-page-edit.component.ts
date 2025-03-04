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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientService } from '../../service/client/client.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Client } from '../../../backend-api/v1';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-client-page-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
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
  router = inject(Router);
  route = inject(ActivatedRoute);
  clientService = inject(ClientService);
  //id = input.required<string>();
  id$ = this.route.paramMap.pipe(
    tap(paramMap => console.log(`paramMap`, paramMap)),
    map(paramMap => paramMap.get('id'))
  );
  formGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
  });
  // todo: change to signal
  client$ = this.id$.pipe(
    tap(id => console.log(`client id: ${id}`)),
    filter(id => id !== null),
    switchMap(id => this.clientService.getById(id!)),
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
    const { id } = this.formGroup.value;
    console.log(
      `submit (update) client with id ${id}; client (form.value):`,
      this.formGroup.value
    );
    this.clientService
      .update(id, this.formGroup.value)
      .pipe(tap(response => console.log('client updated; response:', response)))
      .subscribe();
  }
  delete() {
    const { id } = this.formGroup.value;
    console.log(`delete client with id ${id}`);
    this.clientService
      .delete(id)
      .pipe(
        tap(response => console.log('client deleted; response:', response)),
        tap(() => this.router.navigate(['/client']))
      )
      .subscribe();
  }
}
