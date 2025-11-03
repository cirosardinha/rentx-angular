import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private logoutSubject = new Subject<void>();
  private loginSubject = new Subject<void>();

  logout$ = this.logoutSubject.asObservable();
  login$ = this.loginSubject.asObservable();

  triggerLogout(): void {
    this.logoutSubject.next();
  }

  triggerLogin(): void {
    this.loginSubject.next();
  }
}
