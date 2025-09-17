import { AuthApiService } from './../../services/auth-api-service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service';

@Component({
  selector: 'app-auth-form',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.css',
})
export class AuthForm {
  isLogin = true;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private authService: AuthService
  ) {
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
    this.authApiService.login(this.form.value).subscribe({
      next: (response) => {
        this.authService.login(response.token, response.refresh_token);
        console.log(
          'login realizado com sucesso',
          'usuário:' + response.user.name
        );
      },
      error: (error) => {
        console.error('erro ao realizar login', error);
      },
    });
  }

  onRegisterSubmit() {
    this.authApiService.register(this.form.value).subscribe({
      next: (response) => {
        console.log('cadastro realizado com sucesso');
      },
      error: (error) => {
        console.error('erro ao realizar cadastro', error.error);
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
