import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { Header } from '../../../../shared/components/header/header';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [Header, AsyncPipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  onChangeAvatar() {
    throw new Error('Method not implemented.');
  }
  private _userService = inject(UserService);
  user$: Observable<User> = this._userService.getUserProfile();
}
