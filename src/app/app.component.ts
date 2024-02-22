import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './component/nav/nav.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  UserStateService,
  UserState,
} from './service/user-state/user-state.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

interface ViewModel {
  //user: UserState | undefined;
}

@Component({
  imports: [RouterOutlet, NavComponent, CommonModule, RouterModule, MatButton],
  providers: [UserStateService],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
})
export class AppComponent {
  matIconRegistry = inject(MatIconRegistry);
  domSanitizer = inject(DomSanitizer);
  userState = inject(UserStateService);
  router = inject(Router);
  title = 'demo-app5';
  token = this.userState.select('token');
  vm = signal<ViewModel>({
    /* user: { token: '1234' }, */
  });
  fakeRegisterLogin() {
    //this.vm.set({ user: { token: '1234' } });
    this.userState.set('token', '1234');
  }
  constructor() {
    this.userState.set('token', '1234'); // for testing
    this.userState.set('name', 'Jessie'); // for testing
    this.userState.set('email', 'jdoe@gmail.com'); // for testing
    //this.router.navigate(['meeting/invite']); // for testing
    this.router.navigate(['survey']); // for testing

    this.registerSvgIcons();
  }

  registerSvgIcons() {
    const iconRootPath = '../../assets/icons/';
    const icons = [
      { name: 'check-outline' },
      { name: 'clock-outline' },
      { name: 'note-outline' },
      { name: 'world-outline' },
      /* { name: 'thumbs-up', filename: '' },
      { name: 'thumbs-down', filename: '' },
      { name: 'search', filename: '' },
      { name: 'home', filename: '' }, */
    ];
    icons.forEach(({ name }) => {
      this.matIconRegistry.addSvgIcon(
        name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          `${iconRootPath}${name}.svg`
        )
      );
    });
    //this.matIconRegistry.addSvgIcon(
    //  'thumbs-up',
    //  this.domSanitizer.bypassSecurityTrustResourceUrl(
    //    'assets/img/examples/thumbup-icon.svg'
    //  )
    //);
  }
}
