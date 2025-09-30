import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../../../shared/components/header/header';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, Header],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  cars: any[] = [1, 2, 3, 4, 5, 6];
}
