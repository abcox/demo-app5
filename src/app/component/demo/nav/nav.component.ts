import { Component, ViewChild, inject, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserStateService } from '../../../services/user-state/user-state.service';
import { menuItems } from '../../../config';

export interface MenuItem {
  href: string;
  onClick?: (item: MenuItem) => void;
  opened: boolean;
  routePath: string | undefined;
  title: string;
  visible?: boolean;
}

interface ViewModel {
  menuItems: MenuItem[];
}

@Component({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './nav.component.html',
  selector: 'app-nav',
  styleUrl: './nav.component.scss',
  standalone: true,
})
export class NavComponent {
  @ViewChild('drawer') public drawer!: MatSidenav;
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  private user = inject(UserStateService);

  vm = signal<ViewModel>({
    menuItems,
  });

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  opened = false;
  nav(item: MenuItem) {
    console.log('nav item', item);
    this.drawer.toggle();
    //this.vm.set({ opened: false });
    //this.opened = false;
    if (!item.routePath) {
      console.log('path undef');
      this.router.navigate(['error']);
      return;
    }
    this.router.navigate([item.routePath]);
    console.log('vm', this.vm().menuItems);
  }
  signOut() {
    this.user.set('token', undefined);
  }
}
