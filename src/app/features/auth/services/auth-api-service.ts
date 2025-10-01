import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ILoginPayload } from '../dtos/login-payload-dto';
import { IRegisterPayload } from '../dtos/register-payload-dto';
import { ILoginResponse } from '../dtos/login-response-dto';
import { map, Observable } from 'rxjs';
import {
  IBackendRefreshTokenResponse,
  IRefreshTokenResponse,
} from '../dtos/refresh-token-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private _http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(payload: ILoginPayload): Observable<ILoginResponse> {
    return this._http.post<ILoginResponse>(`${this.apiUrl}/sessions`, payload);
  }

  register(payload: IRegisterPayload): Observable<void> {
    return this._http.post<void>(`${this.apiUrl}/users`, payload);
  }

  refreshToken(refreshToken: string): Observable<IRefreshTokenResponse> {
    return this._http
      .post<IBackendRefreshTokenResponse>(`${this.apiUrl}/refresh-token`, {
        token: refreshToken,
      })
      .pipe(map((response) => response.refresh_token));
  }
}
