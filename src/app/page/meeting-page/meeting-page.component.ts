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
  meeting = {
    name: 'Meeting 1',
    date: '6/15/2023',
    time: '12:00 PM',
    location: '123 Main St.',
  };
  vm = signal({ meeting: this.meeting });
}

export interface MeetingModel {
  name: string;
  date: string;
  time: string;
  location: string;
}
