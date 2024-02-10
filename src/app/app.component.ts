import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from './component/demo/nav/nav.component';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

interface UserDto {
  token: string | undefined;
}

interface ViewModel {
  user: UserDto | undefined;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, CommonModule, RouterModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo-app5';
  vm = signal({ user: { token: undefined } });
}
