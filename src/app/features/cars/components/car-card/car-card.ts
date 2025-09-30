import { Component, inject, Input } from '@angular/core';
import { CarsService } from '../../services/cars-service';
import { Car } from '../../models/car.model';

@Component({
  selector: 'app-car-card',
  imports: [],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard {
  private _carsService = inject(CarsService);

  @Input({ required: true }) car!: Car;

  ngOnInit() {}
}
