import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private apiUrl = 'http://localhost/WS_HOTEL/controllers/reservas.controller.php'; 

  constructor(private http: HttpClient) { }

  comprobarDisponibilidad(habitacionId: number, fechaInicio: string, fechaSalida: string): Observable<any> {
    const params = {
      op: 'disponibilidad',
      habitacionId: habitacionId.toString(),
      fechaInicio: fechaInicio.split('T')[0], // Formatear la fecha a YYYY-MM-DD
      fechaSalida: fechaSalida.split('T')[0] // Formatear la fecha a YYYY-MM-DD
    };
  
    console.log('Parámetros enviados a la API:', params); // Verificar los parámetros enviados
    return this.http.get<any>(this.apiUrl, { params });
  }

  insertarReserva(reserva: any): Observable<any> {
    const params = { op: 'insertar' }; // Enviamos 'op' en los parámetros de la URL
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    // Convertir el objeto a una cadena de parámetros
    const body = new URLSearchParams();
    body.set('op', 'insertar');
    body.set('fecha_inicio', reserva.fecha_inicio);
    body.set('fecha_salida', reserva.fecha_salida);
    body.set('id_habitacion', reserva.id_habitacion.toString());
    body.set('id_usuario', reserva.id_usuario.toString());
    body.set('total_reserva', reserva.total_reserva.toString());
    body.set('numero_reserva', reserva.numero_reserva);

    console.log('📩 Datos enviados al backend:', body.toString());

    return this.http.post<any>(this.apiUrl, body.toString(), { headers });
  }

  getTotalReservas(): Observable<any> {
    const params = { op: 'totalReservas' };
    return this.http.get<any>(this.apiUrl, { params });
  }
  
}
  


