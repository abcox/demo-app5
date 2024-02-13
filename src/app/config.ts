import { MenuItem } from './component/demo/nav/nav.component';
import { DemoPageComponent } from './page/demo-page/demo-page.component';
import { StartPageComponent } from './page/start-page/start-page.component';

export const menuItems = [
  {
    component: StartPageComponent,
    href: '#',
    opened: false,
    routePath: 'start',
    title: 'Start',
  },
  {
    component: DemoPageComponent,
    href: '#',
    opened: false,
    routePath: 'demo',
    title: 'Demo',
  },
];
