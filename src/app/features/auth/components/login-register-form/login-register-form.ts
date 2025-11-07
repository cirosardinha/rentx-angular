import { AuthApiService } from '../../services/auth-api-service';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast-service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-register-form.html',
  styleUrl: './login-register-form.css',
})
export class LoginRegisterForm implements OnInit {
  private fb = inject(FormBuilder);
  private _toastService = inject(ToastService);
  private _authApiService = inject(AuthApiService);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  isLogin = true;

  form: FormGroup;

  constructor() {
    this.form = this.fb.group({
      name: [
        '',
        this.isLogin ? [] : [Validators.required, Validators.minLength(3)],
      ],
      driver_license: ['', this.isLogin ? [] : [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.form.reset();
  }

  toggleForm() {
    this.isLogin = !this.isLogin;

    if (this.isLogin) {
      this.form.get('name')?.clearValidators();
      this.form.get('driver_license')?.clearValidators();
    } else {
      this.form
        .get('name')
        ?.setValidators([Validators.required, Validators.minLength(3)]);
      this.form.get('driver_license')?.setValidators([Validators.required]);
    }

    this.form.get('name')?.updateValueAndValidity();
    this.form.get('driver_license')?.updateValueAndValidity();
  }

  onLoginSubmit() {
    this._authApiService.login(this.form.value).subscribe({
      next: (response) => {
        this._authService.login(response.token, response.refresh_token);

        const returnUrl = this._route.snapshot.queryParamMap.get('returnUrl');
        this._router.navigate([returnUrl || '/']);
      },
      error: (error) => {
        this._toastService.error(`${error.error.error}`);
      },
    });
  }

  onRegisterSubmit() {
    this._authApiService.register(this.form.value).subscribe({
      next: (response) => {
        this._toastService.success(
          'Cadastro realizado com sucesso, faça login para continuar'
        );
        if (!this.isLogin) {
          this.toggleForm();
        }
        const email = this.form.get('email')?.value;
        this.form.reset({ email });
      },
      error: (error) => {
        this._toastService.error(`${error.error.error}`);
      },
    });
  }

  onSubmit() {
    if (this.isLogin) {
      this.onLoginSubmit();
    } else {
      this.onRegisterSubmit();
    }
  }
}
