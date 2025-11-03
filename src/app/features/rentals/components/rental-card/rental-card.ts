import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Rental } from '../../models/rental.model';

@Component({
  selector: 'app-rental-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './rental-card.html',
  styleUrls: ['./rental-card.css'],
})
export class RentalCard {
  @Input({ required: true }) rental!: Rental;
}
