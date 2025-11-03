import {
  Component,
  inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { UserService } from '../../services/user-service';
import { Header } from '../../../../shared/components/header/header';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { RentalCard } from '../../../rentals/components/rental-card/rental-card';
import { RentalService } from '../../../rentals/services/rental-service';
import { Rental } from '../../../rentals/models/rental.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [Header, AsyncPipe, LoadingSpinner, RentalCard, RouterLink],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements AfterViewInit {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  private _userService = inject(UserService);
  private _rentalService = inject(RentalService);

  $user: Observable<User | null> = this._userService.user$;

  isLoading: boolean = false;

  $rentals: Observable<Rental[]> = this._rentalService.getRentalByUser();

  ngAfterViewInit() {}

  onChangeAvatar() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('FileInput não está disponível');
    }
  }

  onFileSelected(event: Event) {
    this.isLoading = true;
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    this._userService.updateUserAvatar(file).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao atualizar avatar:', error);
        this.isLoading = false;
      },
    });
  }
}
