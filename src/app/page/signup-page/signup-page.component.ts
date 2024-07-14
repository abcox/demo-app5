import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  /* standalone: true,
  imports: [], */
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['user@example.com', [Validators.required, Validators.email]],
      name: ['Test User', [Validators.required]],
      password: ['password', [Validators.required]],
      password2: ['password', [Validators.required]], // todo: add password confirmation validation
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
          if ((<any>result)?.success) {
            this.router.navigate(['/login'], { state: { verify: true } }); // go to login page (and show validation message)
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
