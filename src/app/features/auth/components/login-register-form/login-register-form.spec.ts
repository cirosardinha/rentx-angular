import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterForm } from './login-register-form';

describe('LoginRegisterForm', () => {
  let component: LoginRegisterForm;
  let fixture: ComponentFixture<LoginRegisterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginRegisterForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
