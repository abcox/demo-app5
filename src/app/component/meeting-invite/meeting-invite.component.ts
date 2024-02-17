import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-meeting-invite',
  standalone: true,
  imports: [
    CalendarModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatSelectModule,
  ],
  templateUrl: './meeting-invite.component.html',
  styleUrl: './meeting-invite.component.scss',
})
export class MeetingInviteComponent implements OnInit {
  @ViewChild('tabGroup') public tabGroup!: MatTabGroup;
  vm = signal<ViewModel>({
    title: 'Digital Coffee',
    meeting: {
      duration: { unit: 'min', value: 15 },
      note: 'Choose a time or email me at adam@adamcox.net',
      timezone: 'America/Toronto (EST)',
    },
  });
  vmr = this.vm.asReadonly();

  zoneFormControl = new FormControl('');
  dayFormControl = new FormControl('');

  meetingInviteForm = new FormGroup<MeetingInviteForm>({
    dayDate: new FormControl(new Date(), {
      nonNullable: true,
    }),
    timezone: new FormControl(this.vmr().meeting?.timezone, {
      nonNullable: true,
    }),
  });

  date1 = new Date();
  date2 = new Date();
  date3 = new Date();

  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null),
      time: new FormControl<string | null>(null),
      zone: new FormControl<string | null>(null),
    });
    this.formGroup.valueChanges.subscribe(value => {
      console.log('value', value);
      this.tabGroup.selectedIndex = 1;
    });
  }
  availableTimesOnSelectedDay: string[] = ['9:00am', '10:00am', '11:00am'];
  selectTime(time: string) {
    console.log('selectTime', time);
    this.formGroup.patchValue({ time });
  }
  sendRequest() {
    console.log('sendRequest', this.formGroup.value);
  }
  timezoneOptions = [
    'America/Toronto (EST)',
    'America/New_York (EST)',
    'America/Chicago (CST)',
    'America/Denver (MST)',
    'America/Phoenix (MST)',
    'America/Los_Angeles (PST)',
    'America/Anchorage (AKST)',
    'Pacific/Honolulu (HST)',
  ];
  timezoneSelected = this.timezoneOptions[0];
  selectTimezone(timezone: string) {
    console.log('selectTimezone', timezone);
    //this.meetingInviteForm.patchValue({ timezone });
    this.formGroup.patchValue({ zone: timezone });
  }
}

interface ViewModel {
  meeting?: MeetingModel;
  title: string;
}

interface MeetingModel {
  duration: MeetingDurationModel;
  note: string;
  timezone: string;
}

interface MeetingDurationModel {
  unit: string;
  value: number;
}

interface MeetingInviteForm {
  dayDate?: FormControl<Date | undefined>;
  timezone: FormControl<string | undefined>;
}
