import { Car } from '../models/car.model';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private apiUrl = `${environment.apiUrl}/cars`;
  private _http = inject(HttpClient);

  getAvailableCars(): Observable<Car[]> {
    return this._http.get<Car[]>(`${this.apiUrl}/available`);
  }
}
