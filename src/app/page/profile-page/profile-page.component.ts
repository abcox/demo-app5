import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  profile = {
    name: 'Jessie',
    email: 'jdoe@gmail.com',
    registerDate: '6/15/2023',
  };
  vm = signal({ profile: this.profile });
}

export interface ProfileModel {
  name: string;
  email: string;
  registerDate: string;
}
