import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';
export const redirectIfLoggedInGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  const isLoggedIn = _authService.isLoggedIn();

  if (isLoggedIn) {
    _router.navigate(['/']);
    return false;
  }
  return true;
};
