import { Routes } from '@angular/router';
import { AdminLogin } from './pages/admin-login/admin-login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from '../../core/guards/auth-guard';

export const adminRoutes: Routes = [
  {
    path: 'login',
    component: AdminLogin,
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    component: AdminDashboard,
  },
];
