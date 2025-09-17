import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ILoginPayload } from '../models/login-payload.model';
import { IRegisterPayload } from '../models/register-payload.model';
import { ILoginResponse } from '../models/login-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(payload: ILoginPayload): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.apiUrl}/sessions`, payload);
  }

  register(payload: IRegisterPayload): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users`, payload);
  }

  refreshToken(refreshToken: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.apiUrl}/refresh-token`, {
      refresh_token: refreshToken,
    });
  }
}
