import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import {
  AuthResponse,
  AuthResult,
  PasswordResetRequest,
  AuthService as backendAuthService,
} from '../../../backend-api/v1';
import { TOKEN_KEY } from '../../app.config';
import { of } from 'rxjs/internal/observable/of';
import { BehaviorSubject, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authService = inject(backendAuthService);
  private router = inject(Router);
  private token: string | undefined;
  isAuthenticated = signal(false);

  constructor() {
    this.initToken();
  }

  private clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticated.set(false);
  }

  private getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    this.isAuthenticated.set(!!token);
    if (!token) {
      console.warn('Token not found (or empty) in local storage', token);
      return;
    }
    return token;
  }

  private initToken() {
    this.token = this.getToken();
  }

  private setToken(token: string) {
    if (!token) {
      console.warn('Attempted to set empty token. Use clearToken instead.');
      return;
    }
    localStorage.setItem(TOKEN_KEY, token);
    this.isAuthenticated.set(true);
  }

  login(request: { email: string; password: string; twoFactorCode: string }) {
    return this.authService.login(request).pipe(
      map(response => {
        console.log('Login response', response);
        const { token } = response;
        const isAuthenticated = !!token;
        const result = {
          success: isAuthenticated,
          authResult: <AuthResult>response,
        };
        if (result.success) {
          if (response.token) {
            this.setToken(response.token);
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
        console.error('Login err', err);
        this.clearToken();
        return of(<AuthResponse>{ success: false }); // todo: review why the square-brackets notation passes lint check: [{ success: false }]
      })
    );
  }

  register(request: { name: string; email: string; password: string }) {
    return this.authService.register(request).pipe(
      tap((response: AuthResponse) => {
        console.log('Register response', response);
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
        return of(<AuthResponse>{ success: false });
      })
    );
  }

  logout() {
    this.authService
      .logout()
      .pipe(
        tap(response => {
          console.log('Logout response', response);
        }),
        catchError(err => {
          console.error('Error logging out', err);
          return EMPTY;
        }),
        finalize(() => {
          this.clearToken();
          this.router.navigate(['/login']);
        })
      )
      .subscribe();
  }

  // review the intention of this method
  /* checkAuthStatus() {
    const token = localStorage.getItem('token');
    this.isAuthenticated.set(!!token);
  } */
}
