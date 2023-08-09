import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private httpClient: HttpClient) { }

  private url:string = environment.url + 'users';

  private httpOptions = {
    headers: new HttpHeaders({ 
      'Content-Type':'application/json'
    })
  }  

  public createUser (user: object):Observable <object> {    
    return this.httpClient.post<object>(this.url, user, this.httpOptions);
  }
}

