import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);

  // Check if token exists in localStorage
  const token = localStorage.getItem('token'); // or 'authToken' / 'user'

  if (token) {
    return true; // Allow navigation
  }

  // TEMPORARY FOR TESTING: Return true so it won't force redirect to /signup
  return true;

  // Normal logic:
  // router.navigate(['/signup']);
  // return false;
};
