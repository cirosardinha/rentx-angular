import {
  Component,
  inject,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { UserService } from '../../services/user-service';
import { Header } from '../../../../shared/components/header/header';
import { AsyncPipe } from '@angular/common';
import { LoadingSpinner } from '../../../../shared/components/loading-spinner/loading-spinner';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile-page',
  imports: [Header, AsyncPipe, LoadingSpinner],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements AfterViewInit {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  private _userService = inject(UserService);

  $user: Observable<User | null> = this._userService.user$;

  isLoading: boolean = false;

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
