import { Component, inject } from '@angular/core';
import { CarsService } from '../../services/cars-service';
import { Car } from '../../models/car.model';
import { CarCard } from '../../components/car-card/car-card';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Header } from '../../../../shared/components/header/header';

@Component({
  selector: 'app-cars-page',
  imports: [CarCard, AsyncPipe, Header],
  templateUrl: './cars-page.html',
  styleUrl: './cars-page.css',
})
export class CarsPage {
  private _carsService = inject(CarsService);
  cars$: Observable<Car[]> = this._carsService.getAvailableCars();
}
