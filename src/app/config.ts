import { MeetingInviteComponent } from './component/meeting-invite/meeting-invite.component';
import { ProfileEditComponent } from './component/profile/profile-edit/profile-edit.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { InvoicePageComponent } from './page/invoice-page/invoice-page.component';
import { MeetingPageComponent } from './page/meeting-page/meeting-page.component';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';

export const menuItems = [
  {
    component: MeetingPageComponent,
    href: '#',
    opened: false,
    routePath: 'meeting',
    title: 'Meetings',
  },
  {
    component: HomePageComponent,
    href: '#',
    opened: false,
    routePath: 'home',
    title: 'Home',
    visible: false,
  },
  {
    component: InvoicePageComponent,
    href: '#',
    opened: false,
    routePath: 'invoices',
    param: 'id',
    title: 'Invoices',
  },
  {
    component: InvoicePageComponent,
    href: '#',
    opened: false,
    routePath: 'invoice/:id',
    title: 'Invoice',
    visible: false,
  },
  {
    component: ProfilePageComponent,
    href: '#',
    opened: false,
    routePath: 'profile',
    title: 'Profile',
  },
  {
    component: ProfileEditComponent,
    href: '#',
    opened: false,
    routePath: 'profile/edit',
    title: 'Profile',
    visible: false,
  },
  {
    component: MeetingInviteComponent,
    href: '#',
    opened: false,
    routePath: 'meeting/invite',
    title: 'Meeting Invite',
    visible: false,
  },
];
