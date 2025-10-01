import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private _http = inject(HttpClient);

  getUserProfile(): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/profile`);
  }
}
