import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  meetings = signal<MeetingModel[]>([
    {
      beginTime: '6/11/2024 7:45 PM',
      endTime: '6/11/2024 8:45 PM',
      id: '1',
      /* invoiceId: '1', */
      invoiceId: undefined,
      location: {
        type: 'physical',
        value: {
          street: '123 Main St.',
          city: 'Anytown',
          region: 'NY',
          zip: '12345',
        },
      },
      occurrence: {
        interval: { unit: 'week', value: 1 },
        end: { type: 'date', value: '6/15/2025' }, // type: 'count', value: 10
      },
      organizer: {
        userId: '1',
        name: 'John D. Smith',
        title: 'Therapist, RPQ',
      },
    },
    {
      id: '2',
      beginTime: '2/13/2024 7:45 PM',
      endTime: '2/13/2024 8:45 PM',
      location: {
        value: { url: 'https://zoom.us', platform: 'Zoom' },
        type: 'virtual',
        /* value: {
          street: '123 Main St.',
          city: 'Anytown',
          region: 'NY',
          zip: '12345',
        },
        type: 'physical', */
      },
      occurrence: {
        interval: { unit: 'week', value: 1 },
        end: { type: 'date', value: '6/15/2025' }, // type: 'count', value: 10
      },
      organizer: {
        userId: '1',
        name: 'Jane D.',
        photoUrl:
          'https://media.licdn.com/dms/image/C5603AQGTleQRTom6eA/profile-displayphoto-shrink_800_800/0/1516253410442?e=1713398400&v=beta&t=XxcOf8bI0L2feMdyD_-KNRAyDFAnPAjhRLWyciogik0',
      },
    },
  ]);
  constructor() {}
}

export interface MeetingModel {
  id: string;
  beginTime: string;
  endTime: string;
  location: MeetingLocationModel;
  occurrence?: OccurrenceModel;
  organizer: {
    userId: string;
    name: string;
    title?: string;
    photoUrl?: string;
  };
  invoiceId?: string;
}

export interface OccurrenceModel {
  interval: { unit: string; value: number };
  end: { type: string; value: string };
}

export interface MeetingLocationModel {
  type: 'physical' | 'virtual';
  value: AddressModel | VirtualMeetingLocationModel;
}

export interface AddressModel {
  street: string;
  city: string;
  region: string;
  country?: string;
  zip: string;
}

export interface VirtualMeetingLocationModel {
  url: string;
  platform: string;
}
