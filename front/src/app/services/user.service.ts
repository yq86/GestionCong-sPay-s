import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';

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

    public deleteOneShape(shapeId: number): Observable<any> {
      return this.http.delete<any>(`${this.apiServerUrl}/shapes/delete/${shapeId}`) ;
    }

    public updateShape(shape: any): Observable<any> {
      return this.http.put<any>(`${this.apiServerUrl}/shapes`,shape, this.httpOptions) ;

    }

    public addShape(shape: any): Observable<any> {
      return this.http.post<any>(`${this.apiServerUrl}/shapes/add`, shape, this.httpOptions) ;
    }

}
