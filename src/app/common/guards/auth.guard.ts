import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('authGuard: isAuthenticated', authService.isAuthenticated());
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
  }
  return authService.isAuthenticated();
};
