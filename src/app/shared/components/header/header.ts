import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isSidebarOpen = false;
  toggleSidebar() {
    if (window.innerWidth < 768) this.isSidebarOpen = !this.isSidebarOpen;
  }
  logout() {
    this._authService.logout();
    this._router.navigate(['auth']);
  }
}
