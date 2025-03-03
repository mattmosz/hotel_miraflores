import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private apiUrl = 'http://localhost/WS_HOTEL/controllers/empresa.controller.php';

  constructor(private http: HttpClient) { }

  getEmpresa(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?op=todos`);
  }
}