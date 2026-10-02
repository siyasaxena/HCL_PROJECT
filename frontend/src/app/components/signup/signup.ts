import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupComponent {
  isLoginMode = true;

  // Form Fields
  username = '';
  email = '';
  password = '';

  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;

    if (this.isLoginMode) {
      // Handle Sign In
      this.authService.login({ username: this.username, password: this.password }).subscribe({
        next: (res) => {
          this.isLoading = false;
          localStorage.setItem('token', res.token || 'auth-token');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Invalid credentials. Please try again.';
        },
      });
    } else {
      // Handle Sign Up
      this.authService
        .signup({ username: this.username, email: this.email, password: this.password })
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.isLoginMode = true; // Switch to login after successful signup
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
          },
        });
    }
  }
}
