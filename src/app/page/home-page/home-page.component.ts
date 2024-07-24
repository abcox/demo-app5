import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { menuItems } from '../../config';
import { RouterModule } from '@angular/router';
import { UserStateService } from '../../service/user-state/user-state.service';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private user = inject(UserStateService);
  private auth = inject(AuthService);
  isAuthenticated = this.auth.isAuthenticated;
  filteredMenuItems = menuItems.filter(
    item => item.title /*  !== 'Login' && this.isAuthenticated() */
  );
  signOut() {
    //this.user.set('token', undefined);
    this.auth.logout();
  }
}
