import { CommonModule, JsonPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  NgxDateFormat,
  NgxTimelineEvent,
  NgxTimelineEventChangeSide,
  NgxTimelineEventGroup,
  NgxTimelineModule,
  NgxTimelineOrientation,
} from '@frxjs/ngx-timeline';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './timeline-page.component.html',
  styleUrl: './timeline-page.component.scss',
  imports: [
    CommonModule,
    /* JsonPipe, NgClass,  */ NgxTimelineModule,
    ReactiveFormsModule,
  ],
})
export class TimelinePageComponent {
  title = 'demo-app';
  events: NgxTimelineEvent[] = [];
  form: UntypedFormGroup;
  ngxDateFormat = NgxDateFormat;

  configurations = [
    {
      label: 'Language code',
      formControlName: 'langCode',
      options: [
        { name: 'English', value: 'en' },
        { name: 'French', value: 'fr' },
        { name: 'German', value: 'de' },
        { name: 'Spanish', value: 'es' },
        { name: 'Italian', value: 'it' },
        { name: 'Slovenian', value: 'sl' },
        { name: 'Turkish', value: 'tr' },
        { name: 'Polish', value: 'pl' },
        { name: 'Portuguese', value: 'pt' },
        { name: 'Russian', value: 'ru' },
      ],
    },
    {
      label: 'Enable animation',
      formControlName: 'enableAnimation',
      options: [
        { name: 'Enable animation', value: true },
        { name: 'Disable animation', value: false },
      ],
    },
    {
      label: 'Reverse Order',
      formControlName: 'reverseOrder',
      options: [
        { name: 'Normal Time Order (older first)', value: false },
        { name: 'Reverse Time Order (newer first)', value: true },
      ],
    },
    {
      label: 'Custom class',
      formControlName: 'customClass',
      options: [
        { name: 'No Custom Class', value: false },
        { name: 'Custom Class', value: true },
      ],
    },
    {
      label: 'Group events by',
      formControlName: 'groupEvent',
      options: [
        { name: 'Month Year', value: NgxTimelineEventGroup.MONTH_YEAR },
        { name: 'Day Month Year', value: NgxTimelineEventGroup.DAY_MONTH_YEAR },
        { name: 'Year', value: NgxTimelineEventGroup.YEAR },
      ],
    },
    {
      label: 'Change event side',
      formControlName: 'changeSide',
      options: [
        { name: 'All', value: NgxTimelineEventChangeSide.ALL },
        {
          name: 'All in group',
          value: NgxTimelineEventChangeSide.ALL_IN_GROUP,
        },
        {
          name: 'On different day in group',
          value: NgxTimelineEventChangeSide.ON_DIFFERENT_DAY_IN_GROUP,
        },
        {
          name: 'On different hours, minutes and seconds in group',
          value: NgxTimelineEventChangeSide.ON_DIFFERENT_HMS_IN_GROUP,
        },
        {
          name: 'On different month in group',
          value: NgxTimelineEventChangeSide.ON_DIFFERENT_MONTH_IN_GROUP,
        },
      ],
    },
    {
      label: 'Orientation',
      formControlName: 'orientation',
      options: [
        { name: 'Vertical', value: NgxTimelineOrientation.VERTICAL },
        { name: 'Horizontal', value: NgxTimelineOrientation.HORIZONTAL },
      ],
    },
    {
      label: 'Date instant custom template',
      formControlName: 'dateInstantCustomTemplate',
      options: [
        { name: 'No Custom template', value: false },
        { name: 'Custom Date Instant Template', value: true },
      ],
    },
    {
      label: 'Event custom template',
      formControlName: 'eventCustomTemplate',
      options: [
        { name: 'No Custom template', value: false },
        { name: 'Custom Event Template', value: true },
      ],
    },
    {
      label: 'Inner event custom template',
      formControlName: 'innerEventCustomTemplate',
      options: [
        { name: 'No Custom template', value: false },
        { name: 'Custom Inner Event Template', value: true },
      ],
    },
    {
      label: 'Event description custom template',
      formControlName: 'eventDescriptionCustomTemplate',
      options: [
        { name: 'No Custom template', value: false },
        { name: 'Custom Description Event Template', value: true },
      ],
    },
    {
      label: 'Center icon custom template',
      formControlName: 'centerIconCustomTemplate',
      options: [
        { name: 'No Custom Template', value: false },
        { name: 'Custom Icon Template', value: true },
      ],
    },
    {
      label: 'Period custom template',
      formControlName: 'periodCustomTemplate',
      options: [
        { name: 'No Custom Template', value: false },
        { name: 'Custom Period Template', value: true },
      ],
    },
    {
      label: 'Click emitter',
      formControlName: 'clickEmitter',
      options: [
        { name: 'No emitter', value: false },
        { name: 'Handle click (open console)', value: true },
      ],
    },
  ];
  constructor() {
    this.form = new UntypedFormGroup({});
    this.configurations.forEach(configuration =>
      this.form.addControl(
        configuration.formControlName,
        new UntypedFormControl(configuration.options[0].value)
      )
    );
    this.initEvents();
  }

  // make a service for helping with date work:
  private toDateUtc = (localDate: string, timezone: string) =>
    dayjs.tz(localDate, timezone).utc();
  private toDateLocal = (utcDate: string, timezone: string) =>
    dayjs.utc(utcDate).tz(timezone);

  private initEvents(): void {
    //const today = new Date();
    //const tomorrow = new Date();
    //tomorrow.setDate(today.getDate() + 1);
    //const tomorrowPlusOneHour = new Date();
    //tomorrowPlusOneHour.setDate(today.getDate() + 1);
    //tomorrowPlusOneHour.setHours(today.getHours() + 1);
    //const nextMonth = new Date();
    //nextMonth.setMonth(today.getMonth() + 1);
    //const nextYear = new Date();
    //nextYear.setFullYear(today.getFullYear() + 1);

    //const today = dayjs('2022/12/31 15:30', 'YYYY/MM/DD HH:mm');
    const today = dayjs();
    const signup = today.subtract(1, 'year').hour(13).minute(21);
    const session1 = signup.add(1, 'week').hour(19).minute(45);
    const session2 = session1.add(2, 'week');
    const session3 = session2.add(2, 'week');

    this.events = [
      {
        id: 0,
        description: 'Purchased 1yr premium service.',
        timestamp: signup.toDate(),
        title: 'Signup',
      },
      {
        id: 1,
        description: 'Reoccurring (biweekly) session',
        timestamp: session1.toDate(),
        title: 'Session 1',
      },
      {
        id: 2,
        description: 'Reoccurring (biweekly) session',
        timestamp: session2.toDate(),
        title: 'Session 2',
      },
      {
        id: 3,
        description: 'Reoccurring (biweekly) session',
        timestamp: session2.toDate(),
        title: 'Session 3',
      },
    ];
  }

  handleClick(event: any): void {
    window.console.log('', event);
  }
}
