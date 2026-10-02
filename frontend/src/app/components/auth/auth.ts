import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  isSignUp: boolean = false;
  showPassword: boolean = false;
  errorMessage: string = '';

  loginData = { username: '', password: '' };
  signUpData = { username: '', email: '', password: '' };

  toggleMode(signUp: boolean): void {
    this.isSignUp = signUp;
    this.errorMessage = '';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // Alias or method for login
  onLogin(): void {
    this.login();
  }

  login(): void {
    this.errorMessage = '';
    this.authService.login(this.loginData).subscribe({
      next: (res) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
        }
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.errorMessage =
          typeof err.error === 'string' ? err.error : 'Login failed. Please check credentials.';
      },
    });
  }

  // Alias or method for sign up expected by line 121 in auth.html
  onSignUp(): void {
    this.signUp();
  }

  signUp(): void {
    this.errorMessage = '';

    if (!this.signUpData.username || !this.signUpData.email || !this.signUpData.password) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.authService.signup(this.signUpData).subscribe({
      next: (res) => {
        // 1. Store user session so authGuard allows passage
        localStorage.setItem('user', JSON.stringify(res || { username: this.signUpData.username }));

        // 2. Navigate to products dashboard
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.errorMessage =
          typeof err.error === 'string' ? err.error : err.error?.message || 'Signup failed.';
      },
    });
  }
}
