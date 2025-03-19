import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost/WS_HOTEL/controllers/usuarios.controller.php'; 

  constructor(private http: HttpClient) { }

  login(correo_usuario: string, clave_usuario: string): Observable<any> {
    const params = new HttpParams()
      .set('op', 'login')
      .set('correo_usuario', correo_usuario)
      .set('clave_usuario', clave_usuario);

    return this.http.get<any>(this.apiUrl, { params });
  }

  getUsuario(idUsuario: number): Observable<any> {
    const params = { op: 'uno', id_usuario: idUsuario.toString() };
    return this.http.get<any>(this.apiUrl, { params });
  }
}