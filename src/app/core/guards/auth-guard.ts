import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _router = inject(Router);

  const isLoggedIn = _authService.isLoggedIn();

  if (!isLoggedIn) {
    if (_router.url === '/admin/dashboard') {
      _router.navigate(['admin/login']);
    }
    _router.navigate(['admin/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  return true;
};
