import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage {
  correo_usuario: string = '';
  clave_usuario: string = '';

  constructor(private usuariosService: UsuariosService, private router: Router) {}

  loginAdmin(event: Event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    this.usuariosService.loginAdmin(this.correo_usuario, this.clave_usuario).subscribe(
      (response: any) => {
        if (response && response.success) {
          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('adminId', response.admin_id); // Guardar el ID del administrador en el almacenamiento local
          this.router.navigate(['/dashboard']); // Redirigir al panel de administración
        } else {
          console.error('Error al iniciar sesión:', response?.error || 'Credenciales incorrectas');
        }
      },
      (error) => {
        console.error('Error en la solicitud al backend:', error);
      }
    );
  }
}
