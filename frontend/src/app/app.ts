import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  router = inject(Router);

  isAuthPage(): boolean {
    return this.router.url.includes('/login') || this.router.url.includes('/signup');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signup']);
  }
}
