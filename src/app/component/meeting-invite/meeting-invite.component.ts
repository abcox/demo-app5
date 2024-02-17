import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';
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
import { Router } from '@angular/router';
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
  animations: [
    trigger('childAnimation', [
      // ...
      state(
        'selectedHalf',
        style({
          width: '50%',
          //opacity: 1,
          backgroundColor: 'gray',
          color: 'white',
        })
      ),
      state(
        'selectedHalfConfirm',
        style({
          width: '50%',
          //opacity: 1,
          backgroundColor: 'blue',
          color: 'white',
        })
      ),
      state(
        'unselectedFull',
        style({
          width: '100%',
          //opacity: 0.5,
          //backgroundColor: 'green',
        })
      ),
      state(
        'unselectedHidden',
        style({
          //width: '0%',
          //opacity: 0,
          //backgroundColor: 'green',
        })
      ),
      transition('* => *', [animate('.3s')]),
    ]),
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingInviteComponent implements OnInit {
  router = inject(Router);
  @ViewChild('tabGroup') public tabGroup!: MatTabGroup;
  vm = signal<ViewModel>({
    title: 'Virtual Coffee',
    meeting: {
      duration: { unit: 'min', value: 15 },
      note: 'Choose a time or email me at adam@adamcox.net',
      timezone: 'America/Toronto (EST)',
      //latestDate: Date.now() + 1000 * 60 * 60 * 24 * 7 * 2, // 2 weeks
      //earliestDate: Date.now(),
      latestDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 2), // 2 weeks
      earliestDate: new Date(),
    },
    //availableTimesOfSelectedDay: [
    //  { selected: false, value: '9:00 AM' },
    //  { selected: false, value: '10:00 AM' },
    //  { selected: false, value: '11:00 AM' },
    //],
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

  disabledDates: Date[] = [
    new Date('2/25/2024'),
    new Date('2/27/2024'),
    new Date('2/28/2024'),
    // the following date formats do not work with the primeng calendar
    //new Date(2024, 2, 28),
    //new Date('2024-02-28'),
    /* new Date('2024-02-29'),
    new Date('2024-03-01'), */
  ];

  ngOnInit() {
    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null),
      time: new FormControl<string | null>(null),
      zone: new FormControl<string | null>(this.timezoneOptions[0]),
    });
    this.formGroup.valueChanges.subscribe(value => {
      console.log('value', value);
      this.tabGroup.selectedIndex = 1;
      // TODO: bring luxon in to handle timezones, date calcs, etc.
      // TODO: bring in date-fns to handle date formatting?
      // TODO: this needs to be a signal (and data from backend that is related to available times - not already scheduled or blocked times)
      /* if (value.date > new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)) {
        this.availableTimesOfSelectedDay = [
          { selected: true, value: '9:00 AM' },
          { selected: false, value: '10:00 AM' },
          { selected: false, value: '11:00 AM' },
        ];
      } else {
        this.availableTimesOfSelectedDay = [
          { selected: false, value: '1:00 PM' },
          { selected: false, value: '2:00 PM' },
          { selected: false, value: '3:00 PM' },
        ];
      } */
    });
  }
  availableTimesOfSelectedDay: TimeSelectionModel[] = [
    { selected: false, value: '9:00 AM' },
    { selected: false, value: '10:00 AM' },
    { selected: false, value: '11:00 AM' },
  ];
  selectTime(time: TimeSelectionModel) {
    console.log('selectTime', time);
    this.availableTimesOfSelectedDay.forEach(t => (t.selected = false));
    let index = this.availableTimesOfSelectedDay.findIndex(
      t => t.value === time.value
    );
    console.log('index', index);
    console.log(
      'availableTimesOfSelectedDay[index]',
      this.availableTimesOfSelectedDay[index]
    );
    this.availableTimesOfSelectedDay[index].selected =
      !this.availableTimesOfSelectedDay[index].selected;
    this.formGroup.patchValue({
      time: this.availableTimesOfSelectedDay[index].value,
    });
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
  sendRequest() {
    console.log('sendRequest', this.formGroup.value);
    const date = this.formGroup.value?.date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const { time, zone } = this.formGroup.value;
    this.router.navigate([
      'thanks',
      {
        message: `I am looking forward to our time on ${date} at ${time} ${zone}!`,
      },
    ]);
  }
  getDate() {
    return new Date();
  }
}

interface ViewModel {
  meeting?: MeetingModel;
  title: string;
  //availableTimesOfSelectedDay: TimeSelectionModel[];
}

interface MeetingModel {
  duration: MeetingDurationModel;
  note: string;
  timezone: string;
  latestDate: Date | undefined;
  earliestDate: Date | undefined;
}

interface MeetingDurationModel {
  unit: string;
  value: number;
}

interface MeetingInviteForm {
  dayDate?: FormControl<Date | undefined>;
  timezone: FormControl<string | undefined>;
}

interface TimeSelectionModel {
  selected: boolean;
  value: string;
}
