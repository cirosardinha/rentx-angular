import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service';
import { ToastService } from '../../../../shared/services/toast-service';
import { Router } from '@angular/router';
import { AuthApiService } from '../../../auth/services/auth-api-service';

@Component({
  selector: 'app-admin-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  private _fb = inject(FormBuilder);
  private _authApiService = inject(AuthApiService);
  private _authService = inject(AuthService);
  private _toastService = inject(ToastService);
  private _router = inject(Router);

  adminLoginForm: FormGroup;

  constructor() {
    this.adminLoginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.adminLoginForm.invalid) return;

    this._authApiService.login(this.adminLoginForm.value).subscribe({
      next: (response) => {
        this._authService.login(response.token, response.refresh_token);
        this._router.navigate(['admin/dashboard']);
      },
      error: (error) => {
        this._toastService.error('Credenciais inválidas ou erro no servidor');
      },
    });
  }
}
