import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

type FormType = 'car' | 'category' | 'specification';

interface FormModalField {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'textarea';
  placeholder?: string;
  validators?: ValidatorFn[];
}

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-modal.html',
  styleUrl: './form-modal.css',
})
export class FormModal implements OnChanges {
  @Input({ required: true }) visible = false;
  @Input({ required: true }) formType!: FormType;
  @Input() title = '';
  @Output() formSubmit = new EventEmitter<any>();
  @Output() closed = new EventEmitter<void>();

  formGroup!: FormGroup;
  currentFields: FormModalField[] = [];

  private configs: Record<FormType, FormModalField[]> = {
    car: [
      { name: 'name', label: 'Nome', validators: [Validators.required] },
      {
        name: 'description',
        label: 'Descrição',
        type: 'textarea',
        validators: [Validators.required],
      },
      {
        name: 'daily_rate',
        label: 'Valor diário',
        type: 'number',
        validators: [Validators.required, Validators.min(1)],
      },
      {
        name: 'license_plate',
        label: 'Placa',
        validators: [Validators.required],
      },
      {
        name: 'fine_amount',
        label: 'Valor multa',
        type: 'number',
        validators: [Validators.required, Validators.min(0)],
      },
      { name: 'brand', label: 'Marca', validators: [Validators.required] },
    ],
    category: [
      { name: 'name', label: 'Nome', validators: [Validators.required] },
      {
        name: 'description',
        label: 'Descrição',
        type: 'textarea',
        validators: [Validators.required],
      },
    ],
    specification: [
      { name: 'name', label: 'Nome', validators: [Validators.required] },
      {
        name: 'description',
        label: 'Descrição',
        type: 'textarea',
        validators: [Validators.required],
      },
    ],
  };

  constructor(private _fb: FormBuilder) {}

  ngOnChanges(): void {
    if (!this.formType) return;

    this.currentFields = this.configs[this.formType];
    const controls = this.currentFields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: this._fb.control('', field.validators ?? []),
      }),
      {} as Record<string, AbstractControl>
    );

    this.formGroup = this._fb.group(controls);
  }

  handleClose(): void {
    this.closed.emit();
  }

  handleSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.formSubmit.emit(this.formGroup.value);
  }
}
