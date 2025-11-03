import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'cars',

    loadChildren: () =>
      import('./features/cars/cars.routes').then((m) => m.carsRoutes),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./features/user/profile.routes').then((m) => m.userRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
