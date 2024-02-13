import { MenuItem } from './component/demo/nav/nav.component';
import { DemoPageComponent } from './page/demo-page/demo-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { InvoicePageComponent } from './page/invoice-page/invoice-page.component';
import { MeetingPageComponent } from './page/meeting-page/meeting-page.component';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { StartPageComponent } from './page/start-page/start-page.component';

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
    routePath: 'invoice',
    title: 'Invoices',
  },
  {
    component: ProfilePageComponent,
    href: '#',
    opened: false,
    routePath: 'profile',
    title: 'Profile',
  },
  /* {
    component: DemoPageComponent,
    href: '#',
    opened: false,
    routePath: 'demo',
    title: 'Demo',
  }, */
];
