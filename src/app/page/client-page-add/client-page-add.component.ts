import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../service/client/client.service';
import { tap } from 'rxjs/internal/operators/tap';
import { Client } from '../../../backend-api/v1';

@Component({
  selector: 'app-client-page-add',
  standalone: true,
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './client-page-add.component.html',
  styleUrl: './client-page-add.component.scss',
})
export class ClientPageAddComponent {
  router = inject(Router);
  clientService = inject(ClientService);
  formGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    postal: new FormControl(''),
  });
  submit() {
    console.log(this.formGroup.value);
    const client = {
      ...this.formGroup.value,
      address: {
        ...this.formGroup.value,
      },
    };
    this.clientService
      .create(client)
      .pipe(
        tap(response => console.log('submit client add; response:', response)),
        //tap(() => this.formGroup.reset()),
        tap(() => this.router.navigate(['/client']))
      )
      .subscribe();
  }
}
