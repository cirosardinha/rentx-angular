import { Component, inject, Input, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars-service';
import { Car } from '../../models/car.model';
import { Observable } from 'rxjs';
import { CarImage } from '../../models/car-image.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoadingSpinner } from './../../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-car-card',
  imports: [AsyncPipe, CommonModule, LoadingSpinner],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard implements OnInit {
  private _carsService = inject(CarsService);

  @Input({ required: true }) car!: Car;

  carImages$!: Observable<CarImage[]>;

  ngOnInit() {
    this.carImages$ = this._carsService.getCarImages(this.car.id!);
  }
}
