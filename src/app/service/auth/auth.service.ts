import { Injectable, inject, signal, Signal } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import {
  AuthResponse,
  AuthResult,
  PasswordResetRequest,
  AuthService as backendAuthService,
} from '../../../backend-api/v1';
import { TOKEN_KEY } from '../../app.config';
import { of } from 'rxjs/internal/observable/of';
import { EMPTY } from 'rxjs';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authService = inject(backendAuthService);
  private router = inject(Router);
  private token: string | undefined;
  isAuthenticated = signal(false);

  constructor(/* private inactivityService: InactivityService */) {
    //this.initToken();
    this.isAuthenticated.set(true);
  }

  private clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    this.isAuthenticated.set(false);
  }

  private getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    this.isAuthenticated.set(!!token);
    if (!token) {
      //console.warn('Token not found (or empty) in local storage', token);
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
    //this.inactivityService.clearTimers();
    this.authService
      .logout()
      .pipe(
        tap(response => {
          console.log('Logout response', response);
          var token = this.getToken();
          console.log(`token`, token);
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

  getUserClaim(claim: string): any {
    const decoded = this.decodeToken();
    return decoded?.[claim] ?? null;
  }

  getUserRoles(): string[] {
    const decoded = this.decodeToken();
    return decoded?.role
      ? Array.isArray(decoded.role)
        ? decoded.role
        : [decoded.role]
      : [];
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.isTokenExpired();
  }

  //#region token
  decodeToken(): any | null {
    // Function to check if the JWT is expired
    const jwtExpired = (exp?: number): boolean => {
      if (!exp) {
        // If `exp` is undefined, treat it as expired
        return true;
      }
      // `exp` is typically in seconds, so convert it to milliseconds
      const expirationDate = dayjs(exp * 1000); // Convert seconds to milliseconds
      return dayjs().isAfter(expirationDate); // Check if the current time is after the expiration time
    };

    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      const jwt = jwtDecode<JwtPayload>(token);
      //console.log('Decoded token', jwt);
      //console.log('jwtExpired:', jwtExpired(jwt.exp));
      if (jwtExpired(jwt.exp)) {
        console.warn('Token is expired');
        this.clearToken();
        this.router.navigate(['/login']);
        return null;
      }
      return jwt;
    } catch (error) {
      console.error('Failed to decoding token. ERROR:', error);
      return null;
    }
  }
  isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded || !decoded.exp) {
      return true; // Treat as expired if no expiration claim
    }
    const currentTime = Math.floor(new Date().getTime() / 1000); // Current time in seconds
    return decoded.exp < currentTime;
  }
  //#endregion // token
}
