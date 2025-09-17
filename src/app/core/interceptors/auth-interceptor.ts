import { inject } from '@angular/core';
import { AuthService } from './../services/auth-service';
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const accessToken = authService.getAccessToken();

  const authReq = req.clone({
    setHeaders: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = authService.getRefreshToken();

        if (!refreshToken) {
          authService.logout();
          return throwError(() => error);
        }

        return authService.refreshToken().pipe(
          switchMap((response) => {
            authService.login(response.token, response.refresh_token);

            const newReq = req.clone({
              setHeaders: { Authorization: `Bearer ${response.token}` },
            });

            return next(newReq);
          }),
          catchError(() => {
            authService.logout();
            return throwError(() => error);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
