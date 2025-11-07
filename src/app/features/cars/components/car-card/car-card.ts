import { Component, inject, Input, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars-service';
import { Car } from '../../models/car.model';
import { Observable } from 'rxjs';
import { CarImage } from '../../models/car-image.model';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoadingSpinner } from './../../../../shared/components/loading-spinner/loading-spinner';
import { RentalModal } from '../../../rentals/components/rental-modal/rental-modal';
import { RentalService } from '../../../rentals/services/rental-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-card',
  imports: [AsyncPipe, CommonModule, LoadingSpinner, RentalModal],
  templateUrl: './car-card.html',
  styleUrl: './car-card.css',
})
export class CarCard implements OnInit {
  private _carsService = inject(CarsService);
  private _rentalService = inject(RentalService);

  @Input({ required: true }) car!: Car;
  showModal: boolean = false;
  carImages$!: Observable<CarImage[]>;
  router: Router = inject(Router);

  ngOnInit() {
    this.carImages$ = this._carsService.getCarImages(this.car.id!);
  }

  rentCar() {
    if (!sessionStorage.getItem('access_token')) {
      alert('Faça login para alugar um carro');
      this.router.navigate(['/auth']);
      return;
    }
    const expected_return_date = new Date(Date.now() + 24 * 60 * 60 * 1000);
    this._rentalService
      .createRental(this.car.id!, expected_return_date)
      .subscribe({
        next: () => {
          alert('alugado com sucesso!');
          this.closeModal();
        },
        error: (error) => {
          alert('Erro ao alugar o carro');
        },
      });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
