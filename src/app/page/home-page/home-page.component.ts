import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { menuItems } from '../../config';
import { RouterModule } from '@angular/router';
import { UserStateService } from '../../services/user-state/user-state.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatListModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private user = inject(UserStateService);
  menuItems = menuItems;
  signOut() {
    this.user.set('token', undefined);
  }
}
