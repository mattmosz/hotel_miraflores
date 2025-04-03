import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicio/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false
})
export class ClientesPage implements OnInit {
  usuarios: any[] = []; // Lista completa de usuarios
  usuariosFiltrados: any[] = []; // Lista filtrada de usuarios
  searchTerm: string = ''; // Término de búsqueda

  constructor(private usuariosService: UsuariosService, private router : Router) {}

  ngOnInit() {
    this.obtenerUsuarios(); // Cargar la lista de usuarios al iniciar la página
  }

  obtenerUsuarios() {
    this.usuariosService.getClientes().subscribe(
      (response: any[]) => {
        this.usuarios = response || []; // Asignar la lista completa de usuarios
        this.usuariosFiltrados = [...this.usuarios]; // Inicializar la lista filtrada
        console.log('Usuarios obtenidos:', this.usuarios);
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  buscarUsuarios(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter((usuario) =>
      usuario.nombre_usuario.toLowerCase().includes(searchTerm) ||
      usuario.apellido_usuario.toLowerCase().includes(searchTerm) ||
      usuario.correo_usuario.toLowerCase().includes(searchTerm)
    );
  }

  editarUsuario(usuario: any) {
    console.log('Editar usuario:', usuario);
    // Aquí puedes redirigir a una página de edición o abrir un modal
  }

  eliminarUsuario(idUsuario: number) {
    console.log('Eliminar usuario con ID:', idUsuario);
    // Aquí puedes implementar la lógica para eliminar el usuario
  }

  logout() {
    localStorage.removeItem('adminId'); // Eliminar el ID del administrador del almacenamiento local
    this.router.navigate(['/admin']); // Redirigir a la página de inicio de sesión
    console.log('Sesión cerrada');
  }
}
