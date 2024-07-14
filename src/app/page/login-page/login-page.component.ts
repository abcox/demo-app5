import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-login-page',
  /* standalone: true,
  imports: [], */
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private _destroyed$ = new ReplaySubject<void>(undefined);

  loginForm: FormGroup;
  verify = false;
  routeInfo$ = this.router.events.pipe(
    takeUntil(this._destroyed$),
    //filter(event => event instanceof NavigationEnd),
    map(() => ({
      queryParams: this.route.snapshot.queryParams,
      params: this.route.snapshot.params,
      history,
    })),
    tap(routeInfo => console.log(`Route info`, routeInfo)),
    tap(routeInfo => {
      this.verify = routeInfo.history.state.verify ?? false;
    })
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['user@example.com', [Validators.required, Validators.email]],
      password: ['password', [Validators.required]],
      verifyCode: [''],
    });
    if (this.verify) {
      this.loginForm.get('verifyCode')?.setValidators([Validators.required]);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get verifyCode() {
    return this.loginForm.get('verifyCode');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, verifyCode } = this.loginForm.value;
      this.authService
        .login({ email, password, twoFactorCode: verifyCode })
        .subscribe({
          next: result => {
            if (result.success) {
              // todo: send verification email
              this.router.navigate(['/home']); // Navigate to the dashboard or any other route
            } else {
              // Handle login failure (e.g., show error message)
            }
          },
          error: err => {
            // Handle error (e.g., show error message)
          },
        });
    }
  }
}
