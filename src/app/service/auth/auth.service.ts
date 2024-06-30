import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authUrl = 'https://api.example.com/auth';
  isAuthenticated = signal(false);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<{ token: string }>(`${this.authUrl}/login`, credentials)
      .subscribe(response => {
        localStorage.setItem('token', response.token);
        this.isAuthenticated.set(true);
        this.router.navigate(['/dashboard']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  // review the intention of this method
  checkAuthStatus() {
    const token = localStorage.getItem('token');
    this.isAuthenticated.set(!!token);
  }
}
