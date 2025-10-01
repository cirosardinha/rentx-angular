import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../../../shared/components/header/header';
import { CarsService } from '../../../cars/services/cars-service';
import { Observable } from 'rxjs';
import { Car } from '../../../cars/models/car.model';
import { AsyncPipe } from '@angular/common';
import { CarCard } from '../../../cars/components/car-card/car-card';

@Component({
  selector: 'app-home-page',
  imports: [Header, AsyncPipe, CarCard, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private _carsService = inject(CarsService);

  cars$: Observable<Car[]> = this._carsService.getAvailableCars();
}
