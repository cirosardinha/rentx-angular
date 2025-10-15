import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable, tap, switchMap, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private _http = inject(HttpClient);

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.getUserProfile().subscribe({
      next: (user) => this.userSubject.next(user),
      error: (error) => console.error('Erro ao carregar perfil:', error),
    });
  }

  getUserProfile(): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/profile`);
  }

  updateUserAvatar(file: File): Observable<void> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this._http.patch<void>(`${this.apiUrl}/avatar`, formData).pipe(
      switchMap(() => this.getUserProfile()),
      tap((updatedUser) => this.userSubject.next(updatedUser)),
      map(() => undefined)
    );
  }
}
