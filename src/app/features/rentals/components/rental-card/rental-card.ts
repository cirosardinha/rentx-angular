import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Rental } from '../../models/rental.model';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';

@Component({
  selector: 'app-rental-card',
  standalone: true,
  imports: [CommonModule, DatePipe, LoadingSpinner],
  templateUrl: './rental-card.html',
  styleUrls: ['./rental-card.css'],
})
export class RentalCard {
  @Input({ required: true }) rental!: Rental;
  @Output() rentalReturned = new EventEmitter<string>();
  @Input() isLoading: boolean = false;

  onReturnRental() {
    if (!this.rental.id) return;

    this.rentalReturned.emit(this.rental.id);
  }
}
