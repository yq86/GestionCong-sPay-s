import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';
import { Token } from '../models/token';
import { DemandeBody } from '../models/demandeBody';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private apiServerUrl = 'http://localhost:9090';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }



  public getUserDemandes(token: any, idUser: string|null): Observable<any> { // need to post the access token to the backend to get the rights to access the database;
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    }
    return this.http.get<any>(`${this.apiServerUrl}/demandes/getByIdUser/`+idUser, options);
  }

  public demandeConge(token: any, body:DemandeBody): Observable<any> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
    }
    return this.http.post<any>(`${this.apiServerUrl}/demandes/`, body, options);
  }




}
