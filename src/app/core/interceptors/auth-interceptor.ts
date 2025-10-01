import { inject } from '@angular/core';
import { AuthService } from './../services/auth-service';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _authService = inject(AuthService);

  const accessToken = _authService.getAccessToken();

  const authReq = req.clone({
    setHeaders: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = _authService.getRefreshToken();

        if (!refreshToken) {
          _authService.logout();
          return throwError(() => error);
        }

        return _authService.refreshToken().pipe(
          switchMap((response) => {
            _authService.login(response.token, response.refresh_token);

            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${response.token}` },
            });

            return next(newReq);
          }),
          catchError((refreshError) => {
            _authService.logout();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
