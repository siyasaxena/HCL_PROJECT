import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData).pipe(
      tap((response: any) => {
        // Automatically route to /products after successful registration
        this.router.navigate(['/products']);
      }),
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Save token or user details if returned by backend
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        this.router.navigate(['/products']);
      }),
    );
  }
}
