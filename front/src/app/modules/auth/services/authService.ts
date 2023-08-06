import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthModel } from 'src/app/core/models/Auth.interface';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private url:string = environment.url + 'users';

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type':'application/json'
    })
  }  

  public createUser (user: any):Observable <any> {    
    return this.httpClient.post<any>(this.url, user, this.httpOptions);
  }

  public login (credentials: object):Observable<any>{
    return this.httpClient.post<any>(this.url + '/login', credentials, this.httpOptions);
  }
}

