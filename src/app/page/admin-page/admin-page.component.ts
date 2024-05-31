import { Component, inject } from '@angular/core';
import { TestService } from '../../../backend-api/v1';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss',
})
export class AdminPageComponent {
  service = inject(TestService);
  constructor() {}
}
