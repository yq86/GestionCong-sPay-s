import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:9090';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }



  public login(user: UserLogin): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/users/login`,user, this.httpOptions) ;
  }
  
  public getAllUsers(token: Token): Observable<any> { // need to post the access token to the backend to get the rights to access the database;
    return this.http.post<any>(`${this.apiServerUrl}/users/`,token, this.httpOptions) ;
  }





}
