import { Component, Signal, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  ProfileModel,
  UserStateService,
} from '../../../service/user-state/user-state.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent {
  route = inject(ActivatedRoute);
  userState = inject(UserStateService);
  profile: Signal<ProfileModel> = computed(() => {
    return {
      name: this.userState.select('name')(),
      email: this.userState.select('email')(),
      registerDate: '6/15/2023',
      photoUrl:
        'https://media.licdn.com/dms/image/C5603AQGTleQRTom6eA/profile-displayphoto-shrink_800_800/0/1516253410442?e=1713398400&v=beta&t=XxcOf8bI0L2feMdyD_-KNRAyDFAnPAjhRLWyciogik0',
    };
  });
  emailControl = new FormControl(this.profile().email);
  nameControl = new FormControl(this.profile().name);
  uploadImage() {
    console.log('uploadImage');
  }
}
