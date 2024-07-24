import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, PasswordResetRequest } from '../../../backend-api/v1';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth/auth.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-password-reset-page',
  /* standalone: true,
  imports: [], */
  templateUrl: './password-reset-page.component.html',
  styleUrl: './password-reset-page.component.scss',
})
export class PasswordResetPageComponent {
  private authService = inject(AuthService);
  private snackbar = inject(MatSnackBar);
  private _destroyed$ = new ReplaySubject<void>(undefined);
  formGroup: FormGroup;
  loading = false;
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
          this.formGroup.patchValue({
            password: 'tesT1234$$',
            password2: 'tesT1234$$',
          });
          this.formGroup.get('password')?.setValidators([Validators.required]);
          this.formGroup.get('password2')?.setValidators([Validators.required]);
        }
      })
    )
    .subscribe();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      email: ['adam@adamcox.net', [Validators.required, Validators.email]],
      password: [''],
      password2: [''], // todo: add password confirmation validation
      verifyCode: [''],
    });
  }

  get email() {
    return this.formGroup.get('email');
  }
  get password() {
    return this.formGroup.get('password');
  }

  get password2() {
    return this.formGroup.get('password2');
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const { email, password, verifyCode } = this.formGroup.value;
      const request: PasswordResetRequest = {
        email,
        password,
        verifyCode: this.verifyCode$$.value,
      };
      this.loading = true;
      this.authService
        .resetPassword(request)
        .pipe(tap(() => (this.loading = false)))
        .subscribe({
          next: (resp: AuthResponse) => {
            console.log('api resp', resp);
            const { message, success } = resp;
            if (success) {
              // todo: send verification email
              this.router.navigate(['/home']); // Navigate to the dashboard or any other route
            } else {
              // Handle login failure (e.g., show error message)
              this.snackbar.open(
                message ?? 'Password reset failed.',
                'Dismiss',
                {
                  duration: 5000,
                }
              );
              //if (message?.includes('verification')) {
              //  this.verify$$.next(true);
              //  this.formGroup
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
