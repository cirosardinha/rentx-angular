import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { ICreateCarDto } from '../dtos/create-car-dto';

@Injectable({
  providedIn: 'root',
})
export class AdminCarsService {
  private _http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cars`;

  createCar(car: ICreateCarDto): Observable<void> {
    return this._http.post<void>(this.apiUrl, car);
  }

  createCategory(
    categoryName: string,
    categoryDescription: string
  ): Observable<void> {
    return this._http.post<void>(`${environment.apiUrl}/categories`, {
      name: categoryName,
      description: categoryDescription,
    });
  }

  createSpecification(
    specificationName: string,
    specificationDescription: string
  ): Observable<void> {
    return this._http.post<void>(`${environment.apiUrl}/specifications`, {
      name: specificationName,
      description: specificationDescription,
    });
  }
}
