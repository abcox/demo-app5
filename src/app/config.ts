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
import { ClientImportPageComponent } from './page/client-import-page/client-import-page.component';
import { AdminPageComponent } from './page/admin-page/admin-page.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { SignupPageComponent } from './page/signup-page/signup-page.component';
import { PasswordResetPageComponent } from './page/password-reset-page/password-reset-page.component';
import {
  denyWhenAuthenticated,
  requireAuthentication,
  requireRoles,
} from './common/guards/auth.guard';
import { DragDropDemoPageComponent } from './page/drag-drop-demo-page/drag-drop-demo-page.component';
import { EditorDemoPageComponent } from './page/editor-demo-page/editor-demo-page.component';
import { FileUploadDemoPageComponent } from './page/file-upload-demo-page/file-upload-demo-page.component';
import { FileDetailPageComponent } from './page/file-detail-page/file-detail-page.component';
import { FileSelectPageComponent } from './page/file-upload-demo-page/_components/file-select-page/file-select-page.component';
import { TimelinePageComponent } from './page/timeline-page/timeline-page.component';

export interface MenuItem {
  component: any;
  href: string;
  opened: boolean;
  routePath: string;
  param?: string; // todo: what is this for? (remove?)
  title: string;
  visible?: boolean; // optional, default is true
  roles?: string[]; // optional, default is undefined; when specifying roles, the user must have at least one of the roles to see the menu item
  canActivate?: any[]; // optional, default is undefined; when specifying canActivate, the user must pass all guards to see the menu item
  allowGuest?: boolean; // optional, default is false; when true, the menu item is visible to unauthenticated users
}

export const menuItems: MenuItem[] = [
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
    roles: ['guest'],
    canActivate: [() => true],
  },
  {
    component: InvoicePageComponent,
    href: '#',
    opened: false,
    routePath: 'invoices',
    param: 'id', // todo: what is this for? (remove?)
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
    allowGuest: true,
    roles: ['guest'],
  },
  {
    component: ClientPageComponent,
    href: '#',
    opened: false,
    routePath: 'client',
    title: 'Clients',
    visible: true,
    roles: ['admin'],
    canActivate: [requireAuthentication, () => requireRoles(['admin'], '/')],
  },
  {
    component: ClientPageAddComponent,
    href: '#',
    opened: false,
    routePath: 'client/add',
    title: 'Clients',
    visible: false,
    roles: ['admin'],
    canActivate: [requireAuthentication, () => requireRoles(['admin'], '/')],
  },
  {
    component: ClientPageEditComponent,
    href: '#',
    opened: false,
    routePath: 'client/edit/:id',
    title: 'Clients',
    visible: false,
    roles: ['admin'],
    canActivate: [requireAuthentication, () => requireRoles(['admin'], '/')],
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
  {
    component: ClientImportPageComponent,
    href: '#',
    opened: false,
    routePath: 'client/import',
    title: 'Client Import',
    visible: false,
  },
  {
    component: AdminPageComponent,
    href: '#',
    opened: false,
    routePath: 'admin',
    title: 'Admin',
    //visible: false, // optional, default is true
    roles: ['admin'], // when specifying roles, the user must have at least one of the roles to see the menu item
    canActivate: [requireAuthentication, () => requireRoles(['admin'], '/')],
  },
  {
    component: LoginPageComponent,
    href: '#',
    opened: false,
    routePath: 'login',
    title: 'Login',
    visible: false,
    canActivate: [denyWhenAuthenticated],
  },
  {
    component: SignupPageComponent,
    href: '#',
    opened: false,
    routePath: 'signup',
    title: 'Signup',
    visible: false,
    canActivate: [denyWhenAuthenticated],
  },
  {
    component: PasswordResetPageComponent,
    href: '#',
    opened: false,
    routePath: 'password-reset',
    title: 'Password Reset',
    visible: false,
    canActivate: [denyWhenAuthenticated],
  },
  {
    component: DragDropDemoPageComponent,
    href: '#',
    opened: false,
    routePath: 'drag-drop-demo',
    title: 'Drag & Drop Demo',
    visible: true,
  },
  {
    component: EditorDemoPageComponent,
    href: '#',
    opened: false,
    routePath: 'editor-demo',
    title: 'Editor Demo',
    visible: true,
  },
  {
    component: FileUploadDemoPageComponent,
    href: '#',
    opened: false,
    routePath: 'upload-demo',
    title: 'Upload Demo',
    visible: true,
  },
  {
    component: FileDetailPageComponent,
    href: '#',
    opened: false,
    routePath: 'file/detail',
    title: 'File Detail',
    visible: false,
  },
  {
    component: FileSelectPageComponent,
    href: '#',
    opened: false,
    routePath: 'file/new',
    title: 'New File',
    visible: false,
  },
  {
    component: TimelinePageComponent,
    href: '#',
    opened: false,
    routePath: 'history',
    title: 'Profile History',
    visible: true,
  },
];
