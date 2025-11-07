import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  _messageService = inject(MessageService);

  success(message: string) {
    this._messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }

  error(message: string) {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  warning(message: string) {
    this._messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
    });
  }

  info(message: string) {
    this._messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
    });
  }

  clear() {
    this._messageService.clear();
  }
}
