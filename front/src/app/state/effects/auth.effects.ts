import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/services/authService';
import Swal from 'sweetalert2';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin$ = createEffect(() => this.actions$.pipe(
    ofType('[Login Page] Login'),
    exhaustMap(({email, password}) => {
      return this.authService.login({email, password})
      .pipe(
        map(data => {
          sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            user: data.user
          }));
          sessionStorage.setItem('token', `Bearer ${data.token}`);
          this.router.navigate(['/home']);
          return {
            type: '[Login Page] Successful login', login: { isAuth: true, user: data.user }
          };
        }),
        catchError(() => { 
          Swal.fire(
                      'Error Login',                
                      'Usuario y/o contraseña incorrectos',
                      'error'
                    );
          return of({ type: '[Login Page] Finish loading' }); })
      )})
  ));
}