import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserStateService } from '../../service/user-state/user-state.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private user = inject(UserStateService);
  profile = {
    id: '1',
    name: 'Jessie',
    email: 'jdoe@gmail.com',
    photoUrl:
      'https://media.licdn.com/dms/image/C5603AQGTleQRTom6eA/profile-displayphoto-shrink_800_800/0/1516253410442?e=1713398400&v=beta&t=XxcOf8bI0L2feMdyD_-KNRAyDFAnPAjhRLWyciogik0',
    registerDate: '6/15/2023',
  };
  vm = signal({ profile: this.profile });
  signOut() {
    this.user.set('token', undefined);
  }
}

export interface ProfileModel {
  name: string;
  email: string;
  registerDate: string;
}
