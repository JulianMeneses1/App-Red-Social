import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';
import { AppState } from 'src/app/state/app.state';
import { selectIsAuth } from 'src/app/state/selectors/auth.selector';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isAuth$: Observable<boolean> = new Observable();

  constructor(private httpClient: HttpClient,
    private store: Store<AppState>) 
  {
    this.isAuth$ = this.store.select(selectIsAuth);
  }

  private url: string = environment.url + 'users';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public login(credentials: object): Observable<any> {
    return this.httpClient.post<any>(this.url + '/login', credentials, this.httpOptions);
  }

  public isAuthenticated(): Observable<boolean> {
    return this.isAuth$;
  }
}

