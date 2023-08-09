import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { exhaustMap, catchError, switchMap, tap } from 'rxjs/operators';
import { UsersService } from 'src/app/services/usersService';
import Swal from 'sweetalert2';
import { createUser } from '../actions/users.actions';
import { onLogin } from '../actions/auth.actions';

@Injectable()
export class UsersEffects {

    onCreateUser$ = createEffect(() => this.actions$.pipe(
        ofType('[Register Page] On create user'),
        exhaustMap(({user}) => 
            this.usersService.createUser(user)
            .pipe(
                switchMap(() => {     
                    const credentials = {user}.user  ;
                    return [
                        createUser({user}),
                        onLogin(credentials),
                    ]
                }),
                catchError(() => {
                    Swal.fire(
                        'Error Creación Usuario',
                        'Ha habido un error al crear el usuario, inténtelo nuevamente',
                        'error'
                    );
                    return of({ type: '[All Pages] Finish loading' });
                })
            ))
    ));

    constructor(
        private actions$: Actions,
        private usersService: UsersService
    ) { }
}