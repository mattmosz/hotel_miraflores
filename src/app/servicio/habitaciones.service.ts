import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  private apiUrl = 'http://localhost/WS_HOTEL/controllers/habitaciones.controller.php'; 

  constructor(private http: HttpClient) { }

  getHabitaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?op=todos`);
  }
}