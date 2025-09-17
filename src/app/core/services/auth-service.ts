import { inject, Injectable } from '@angular/core';
import { AuthApiService } from '../../features/auth/services/auth-api-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authApiService: AuthApiService = inject(AuthApiService);

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
  }

  logout(): void {
    this.clearTokens();
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  refreshToken() {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error('Refresh token não encontrado');
    }

    return this.authApiService
      .refreshToken(refreshToken)
      .pipe(
        tap((response) => this.login(response.token, response.refresh_token))
      );
  }
}
