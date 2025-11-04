import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Rental } from '../models/rental.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl = `${environment.apiUrl}/rentals`;
  _http = inject(HttpClient);

  getRentalByUser(): Observable<Rental[]> {
    return this._http.get<Rental[]>(`${this.apiUrl}/user`);
  }

  createRental(car_id: string, expected_return_date: Date): Observable<Rental> {
    return this._http.post<Rental>(`${this.apiUrl}`, {
      car_id,
      expected_return_date,
    });
  }
}
