import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { AuthResult } from '../../../backend-api/v1';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  /* standalone: true,
  imports: [], */
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private snackbar = inject(MatSnackBar);
  private _destroyed$ = new ReplaySubject<void>(undefined);

  loginForm: FormGroup;
  verifyCode$$ = new BehaviorSubject<string | undefined>(undefined);
  routeInfo$ = this.router.events
    .pipe(
      takeUntil(this._destroyed$),
      //filter(event => event instanceof NavigationEnd),
      map(() => ({
        queryParams: this.route.snapshot.queryParams,
        params: this.route.snapshot.params,
        history,
      })),
      tap(routeInfo => console.log(`Route info`, routeInfo)),
      tap(routeInfo => {
        const code = (<any>routeInfo.queryParams)?.code;
        console.log('code', code);
        if (code) {
          this.verifyCode$$.next(code);
          this.loginForm.patchValue({
            verifyCode: code,
          });
          this.loginForm
            .get('verifyCode')
            ?.setValidators([Validators.required]);
        }
      })
    )
    .subscribe();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    // todo: remove hard-coded password once testing is complete!
    this.loginForm = this.fb.group({
      email: ['adam@adamcox.net', [Validators.required, Validators.email]],
      password: ['tesT1234$$', [Validators.required]],
      verifyCode: [''],
    });
    if (this.verifyCode$$.value) {
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
          next: (result: any) => {
            console.log('Login result', result);
            const { isAuthenticated, authResult } = result;
            const { message, success } = <AuthResult>authResult;
            if (success) {
              // todo: send verification email
              this.router.navigate(['/home']); // Navigate to the dashboard or any other route
            } else {
              // Handle login failure (e.g., show error message)
              this.snackbar.open(message ?? 'Login failed', 'Dismiss', {
                duration: 5000,
              });
              //if (message?.includes('verification')) {
              //  this.verifyCode$$.next(true);
              //  this.loginForm
              //    .get('verifyCode')
              //    ?.setValidators([Validators.required]);
              //  this.cdr.detectChanges();
              //}
            }
          },
          error: err => {
            // Handle error (e.g., show error message)
          },
        });
    }
  }
}
