import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule],
  templateUrl: './loading-spinner.html',
  styleUrls: ['./loading-spinner.css'],
})
export class LoadingSpinner {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() message: string = 'Carregando...';
  @Input() color: 'blue' | 'slate' | 'white' = 'slate';

  get sizeClass(): string {
    const sizes = {
      sm: 'w-6 h-6',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
    };
    return sizes[this.size];
  }

  get colorClass(): string {
    const colors = {
      blue: 'text-blue-500',
      slate: 'text-slate-500',
      white: 'text-white',
    };
    return colors[this.color];
  }
}
