import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  API: string='https://localhost:7158/api/persons/'

  constructor(private clienteHttp:HttpClient) { };

  GetUsers(): Observable<any>{
    return this.clienteHttp.get(this.API);
  }

}
