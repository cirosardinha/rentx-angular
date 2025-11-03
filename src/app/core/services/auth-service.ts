import { inject, Injectable } from '@angular/core';
import { AuthApiService } from '../../features/auth/services/auth-api-service';
import { Observable, tap } from 'rxjs';
import { IRefreshTokenResponse } from '../../features/auth/dtos/refresh-token-dto';
import { AppStateService } from './app-state-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authApiService: AuthApiService = inject(AuthApiService);
  private _appStateService: AppStateService = inject(AppStateService);

  private ACCESS_TOKEN: string = 'access_token';
  private REFRESH_TOKEN: string = 'refresh_token';

  getAccessToken(): string | null {
    return sessionStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem(this.ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  private clearTokens(): void {
    sessionStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  login(accessToken: string, refreshToken: string): void {
    this.setTokens(accessToken, refreshToken);
    this._appStateService.triggerLogin();
  }

  logout(): void {
    this.clearTokens();
    this._appStateService.triggerLogout();
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }

    return this._authApiService
      .refreshToken(refreshToken)
      .pipe(
        tap((response) => this.login(response.token, response.refresh_token))
      );
  }
}
