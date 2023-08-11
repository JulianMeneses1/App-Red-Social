import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../modules/auth/services/authService';
import { map } from 'rxjs/operators';

export const AuthGuard = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      return isAuthenticated ? true : router.navigate(['']); 
    })
  )
};

export const AuthenticatedGuard = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      return isAuthenticated ? router.navigate(['/home']) : true;  
    })
  )
};
