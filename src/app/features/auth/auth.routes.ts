import { Routes } from '@angular/router';
import { LoginRegisterForm } from './components/login-register-form/login-register-form';

export const authRoutes: Routes = [
  {
    path: '',
    component: LoginRegisterForm,
  },
];
