import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './component/nav/nav.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  UserStateService,
  UserState,
} from './service/user-state/user-state.service';

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
  constructor(private userState: UserStateService) {
    this.userState.set('token', '1234'); // for testing
    this.userState.set('name', 'Jessie'); // for testing
    this.userState.set('email', 'jdoe@gmail.com'); // for testing
    this.router.navigate(['meeting/invite']); // for testing
  }
}
