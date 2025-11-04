import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from '../../../cars/models/car.model';

@Component({
  selector: 'app-rental-modal',
  imports: [],
  templateUrl: './rental-modal.html',
  styleUrl: './rental-modal.css',
})
export class RentalModal {
  @Input() car!: Car;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  confirmRental() {
    this.confirm.emit();
  }
}
