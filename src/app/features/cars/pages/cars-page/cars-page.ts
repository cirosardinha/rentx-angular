import { Component, inject } from '@angular/core';
import { CarsService } from '../../services/cars-service';
import { Car } from '../../models/car.model';
import { CarCard } from '../../components/car-card/car-card';

@Component({
  selector: 'app-cars-page',
  imports: [CarCard],
  templateUrl: './cars-page.html',
  styleUrl: './cars-page.css',
})
export class CarsPage {
  private _carsService = inject(CarsService);
  cars: Car[] = [];

  ngOnInit() {
    this._carsService.getAvailableCars().subscribe((cars) => {
      this.cars = cars;
    });
  }
}
