import { Routes } from '@angular/router';
import { AuthForm } from './pages/auth-form/auth-form';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthForm,
  },
];
