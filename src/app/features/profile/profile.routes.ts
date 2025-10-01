import { Routes } from '@angular/router';
import { ProfilePage } from './pages/profile-page/profile-page';
import { authGuard } from '../../core/guards/auth-guard';

export const profileRoutes: Routes = [
  {
    path: '',
    component: ProfilePage,
    canActivate: [authGuard],
  },
];
