import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl = 'http://localhost/WS_HOTEL/controllers/reservas.controller.php'; 

  constructor(private http: HttpClient) { }

  comprobarDisponibilidad(habitacionId: number, fechaInicio: string, fechaFin: string): Observable<any> {
    const params = {
      op: 'disponibilidad',
      habitacionId: habitacionId.toString(),
      fechaInicio: fechaInicio.split('T')[0], // Formatear la fecha a YYYY-MM-DD
      fechaFin: fechaFin.split('T')[0] // Formatear la fecha a YYYY-MM-DD
    };
    return this.http.get<any>(this.apiUrl, { params });
  }
}
