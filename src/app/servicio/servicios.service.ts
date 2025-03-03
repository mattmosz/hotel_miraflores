import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = 'http://localhost/WS_HOTEL/controllers/servicios.controller.php';

  constructor(private http: HttpClient) { }

  getServicios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?op=todos`);
  }
}