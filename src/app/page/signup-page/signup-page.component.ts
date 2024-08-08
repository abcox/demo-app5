import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthResponse } from '../../../backend-api/v1';

@Component({
  selector: 'app-login-page',
  /* standalone: true,
  imports: [], */
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {
  private snackbar = inject(MatSnackBar);

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']); // redirect to home page if already authenticated
    }
    this.signupForm = this.getInitForm();
  }

  getInitForm() {
    return this.fb.group({
      email: ['adam@adamcox.net', [Validators.required, Validators.email]],
      name: ['Adam Cox', [Validators.required]],
      password: ['tesT1234$$', [Validators.required]],
      password2: ['tesT1234$$', [Validators.required]], // todo: add password confirmation validation
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get password2() {
    return this.signupForm.get('password2');
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { email, name, password } = this.signupForm.value;
      this.authService.register({ name, email, password }).subscribe({
        next: result => {
          console.log('Register result', result);
          const { message } = result;
          if ((<any>result)?.success) {
            this.router.navigate(['/login'], { state: { verify: true } }); // go to login page (and show validation message)
          } else {
            this.snackbar.open(message ?? 'Registration failed', 'Dismiss', {
              duration: 5000,
            });
          }
        },
        error: err => {
          // Handle error (e.g., show error message)
        },
      });
    }
  }
}
