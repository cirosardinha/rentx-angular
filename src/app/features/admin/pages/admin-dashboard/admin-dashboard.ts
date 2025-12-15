import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModal } from '../../components/form-modal/form-modal';
import { AdminCarsService } from '../../services/admin-cars-service';
import { ToastService } from '../../../../shared/services/toast-service';
import { ICreateCarDto } from '../../dtos/create-car-dto';

type FormType = 'car' | 'category' | 'specification';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormModal],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
  modalVisible = signal(false);
  currentFormType = signal<FormType>('car');
  modalTitle = signal('Cadastrar novo carro');

  constructor(
    private adminCarsService: AdminCarsService,
    private toast: ToastService
  ) {}

  openModal(type: FormType) {
    this.currentFormType.set(type);
    this.modalTitle.set(
      type === 'car'
        ? 'Cadastrar novo carro'
        : type === 'category'
        ? 'Cadastrar nova categoria'
        : 'Cadastrar nova especificação'
    );
    this.modalVisible.set(true);
  }

  closeModal() {
    this.modalVisible.set(false);
  }

  handleSubmit(payload: any) {
    switch (this.currentFormType()) {
      case 'car':
        this.createCar(payload as ICreateCarDto);
        break;
      case 'category':
        this.createCategory(payload);
        break;
      case 'specification':
        this.createSpecification(payload);
        break;
    }
  }

  private createCar(payload: ICreateCarDto) {
    this.adminCarsService.createCar(payload).subscribe({
      next: () => {
        this.toast.success('Carro criado com sucesso');
        this.closeModal();
      },
      error: () => this.toast.error('Erro ao criar carro'),
    });
  }

  private createCategory(payload: { name: string; description: string }) {
    this.adminCarsService
      .createCategory(payload.name, payload.description)
      .subscribe({
        next: () => {
          this.toast.success('Categoria criada com sucesso');
          this.closeModal();
        },
        error: () => this.toast.error('Erro ao criar categoria'),
      });
  }

  private createSpecification(payload: { name: string; description: string }) {
    this.adminCarsService
      .createSpecification(payload.name, payload.description)
      .subscribe({
        next: () => {
          this.toast.success('Especificação criada com sucesso');
          this.closeModal();
        },
        error: () => this.toast.error('Erro ao criar especificação'),
      });
  }
}
