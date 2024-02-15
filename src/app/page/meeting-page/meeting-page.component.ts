import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import {
  AddressModel,
  MeetingService,
} from '../../service/meeting/meeting.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-meeting-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    RouterModule,
  ],
  templateUrl: './meeting-page.component.html',
  styleUrl: './meeting-page.component.scss',
})
export class MeetingPageComponent {
  meetings = inject(MeetingService).meetings;
  meetingsFuture = computed(() =>
    this.meetings().filter(m => new Date(m.beginTime) >= new Date())
  );
  meetingsPast = computed(() =>
    this.meetings().filter(m => new Date(m.beginTime) < new Date())
  );
  vm = signal({
    meetings: { past: this.meetingsFuture(), next: this.meetingsPast() },
  });
  toAddress(value: any): AddressModel {
    return value;
  }
}
