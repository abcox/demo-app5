import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meeting-page',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './meeting-page.component.html',
  styleUrl: './meeting-page.component.scss',
})
export class MeetingPageComponent {
  meetings = [
    {
      date: '6/15/2024',
      time: '12:00 PM',
      location: '123 Main St.',
    },
  ];
  vm = signal({ meetings: { past: this.meetings, next: this.meetings } });
}

export interface MeetingModel {
  date: string;
  time: string;
  location: string;
}
