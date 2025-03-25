import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false,
})
export class RegistroPage {
  nombre_usuario: string = '';
  apellido_usuario: string = '';
  usuario: string = '';
  correo_usuario: string = '';
  clave_usuario: string = '';
  direccion_usuario: string = '';
  telefono_usuario: string = '';

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {}

  registrarUsuario(event: Event) {
    event.preventDefault();
  
    const usuario = {
      nombre_usuario: this.nombre_usuario,
      apellido_usuario: this.apellido_usuario,
      usuario : this.usuario,
      correo_usuario: this.correo_usuario,
      clave_usuario: this.clave_usuario,
      direccion_usuario: this.direccion_usuario,
      telefono_usuario: this.telefono_usuario,
      rol_usuario: 2, 
      foto_usuario: '', 
      estado_usuario: 1, 
    };
  
    console.log('Datos enviados al backend:', usuario);
  
    this.usuariosService.insertarUsuario(usuario).subscribe(
      (response: any) => {
        console.log('Respuesta del backend:', response);
        
        if (response && response.success) {
          console.log('Usuario registrado correctamente:', response.mensaje);
          this.router.navigate(['/login']);
        } else {
          console.error('Error al registrar el usuario:', response?.error || 'Error desconocido');
        }
      },
      (error) => {
        console.error('Error en la solicitud al backend:', error);
      }
    );
  }
}
