import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import {
  AuthResponse,
  AuthResult,
  PasswordResetRequest,
  AuthService as backendAuthService,
} from '../../../backend-api/v1';
import { TOKEN_KEY } from '../../app.config';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authService = inject(backendAuthService);
  private router = inject(Router);
  isAuthenticated = signal(false);

  constructor() {}

  login(request: { email: string; password: string; twoFactorCode: string }) {
    return this.authService.login(request).pipe(
      map(response => {
        const { token } = response;
        const isAuthenticated = !!token;
        const result = {
          success: isAuthenticated,
          authResult: <AuthResult>response,
        };
        if (result.success) {
          if (response.token) {
            localStorage.setItem(TOKEN_KEY, response.token);
          } else {
            console.warn('No token returned from login request', response);
          }
          //this.router.navigate(['/dashboard']);
        }
        this.isAuthenticated.set(isAuthenticated);
        return result;
      }),
      catchError(err => {
        // todo: create shared error handling service - where we can log errors and show error messages
        this.isAuthenticated.set(false);
        return of(<AuthResponse>{ success: false }); // todo: review why the square-brackets notation passes lint check: [{ success: false }]
      })
    );
  }

  register(request: { name: string; email: string; password: string }) {
    return this.authService.register(request).pipe(
      tap((response: AuthResponse) => {
        const result = response; // todo: map response to a more meaningful result object
        //const { token } = response;
        //const isAuthenticated = !!token;
        //const result = { success: isAuthenticated };
        //if (result.success) {
        //  localStorage.setItem(TOKEN_KEY, response.token);
        //  //this.router.navigate(['/dashboard']);
        //}
        //this.isAuthenticated.set(isAuthenticated);
        //return result;
        //this.router.navigate(['/login']);
        return result;
      }),
      catchError(err => {
        // todo: create shared error handling service - where we can log errors and show error messages
        console.error('Error registering', err);
        this.isAuthenticated.set(false);
        return of(<AuthResponse>{ success: false });
      })
    );
  }

  resetPassword(request: PasswordResetRequest) {
    return this.authService.passwordReset(request).pipe(
      tap((response: AuthResponse) => {
        console.log('Password reset response', response);
        const result = response; // todo: map response to a more meaningful result object
        //const { token } = response;
        //const isAuthenticated = !!token;
        //const result = { success: isAuthenticated };
        //if (result.success) {
        //  localStorage.setItem(TOKEN_KEY, response.token);
        //  //this.router.navigate(['/dashboard']);
        //}
        //this.isAuthenticated.set(isAuthenticated);
        //return result;
        //this.router.navigate(['/login']);
        return result;
      }),
      catchError(err => {
        // todo: create shared error handling service - where we can log errors and show error messages
        console.error('Error registering', err);
        this.isAuthenticated.set(false);
        return of(<AuthResponse>{ success: false });
      })
    );
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.isAuthenticated.set(false);
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Error logging out', err);
        this.isAuthenticated.set(false);
        this.router.navigate(['/login']);
      },
    });
  }

  // review the intention of this method
  checkAuthStatus() {
    const token = localStorage.getItem('token');
    this.isAuthenticated.set(!!token);
  }
}
