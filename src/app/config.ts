import { MeetingInviteComponent } from './component/meeting-invite/meeting-invite.component';
import { ProfileEditComponent } from './component/profile/profile-edit/profile-edit.component';
import { ThankyouComponent } from './component/thankyou/thankyou.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { InvoicePageComponent } from './page/invoice-page/invoice-page.component';
import { MeetingPageComponent } from './page/meeting-page/meeting-page.component';
import { ProfilePageComponent } from './page/profile-page/profile-page.component';
import { SurveyPageComponent } from './page/survey-page/survey-page.component';
import { WeatherPageComponent } from './page/weather-page/weather-page.component';
import { ClientPageComponent } from './page/client-page/client-page.component';
import { PokemonPageComponent } from './page/pokemon-page/pokemon-page.component';
import { PokemonDetailPageComponent } from './page/pokemon-detail-page/pokemon-detail-page.component';
import { ClientPageAddComponent } from './page/client-page-add/client-page-add.component';
import { ClientPageEditComponent } from './page/client-page-edit/client-page-edit.component';
import { DemoPageComponent } from './page/demo-page/demo-page.component';

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
    title: 'Meeting Request',
    visible: true,
  },
  {
    component: ThankyouComponent,
    href: '#',
    opened: false,
    routePath: 'thanks',
    title: 'Thank You!',
    visible: false,
  },
  {
    component: SurveyPageComponent,
    href: '#',
    opened: false,
    routePath: 'survey',
    title: 'Survey',
    visible: true,
  },
  {
    component: WeatherPageComponent,
    href: '#',
    opened: false,
    routePath: 'weather',
    title: 'Weather',
    visible: true,
  },
  {
    component: ClientPageComponent,
    href: '#',
    opened: false,
    routePath: 'client',
    title: 'Clients',
    visible: true,
  },
  {
    component: ClientPageAddComponent,
    href: '#',
    opened: false,
    routePath: 'client/add',
    title: 'Clients',
    visible: false,
  },
  {
    component: ClientPageEditComponent,
    href: '#',
    opened: false,
    routePath: 'client/edit/:id',
    title: 'Clients',
    visible: false,
  },
  {
    component: PokemonPageComponent,
    href: '#',
    opened: false,
    routePath: 'demo',
    title: 'Demo',
    visible: true,
  },
  {
    component: PokemonDetailPageComponent,
    href: '#',
    opened: false,
    routePath: 'demo/detail/:id',
    title: 'Demo Detail',
    visible: false,
  },
  {
    component: DemoPageComponent,
    href: '#',
    opened: false,
    routePath: 'demo2',
    title: 'Demo2',
    visible: true,
  },
];
