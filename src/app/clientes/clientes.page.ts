import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicio/usuarios.service';
import { Router } from '@angular/router';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { EditarUsuarioModalComponent } from '../editar-usuario-modal/editar-usuario-modal.component';

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

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) {}

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

  async editarUsuario(usuario: any) {
    const modal = await this.modalController.create({
      component: EditarUsuarioModalComponent,
      componentProps: { idUsuario: usuario.id_usuario },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Datos actualizados:', result.data);
        this.obtenerUsuarios(); // Actualizar la lista de usuarios
      }
    });

    return await modal.present();
  }

  async eliminarUsuario(idUsuario: number) {
    // Mostrar cuadro de confirmación
    console.log('ID del usuario a eliminar:', idUsuario);
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Está seguro de que desea eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Sí, eliminar',
          handler: async () => {
            // Llamar a la función de eliminar usuario
            this.usuariosService.eliminarUsuario(idUsuario).subscribe(
              async (response: any) => {
                if (response.success) {
                  // Mostrar un Toast de éxito
                  const toast = await this.toastController.create({
                    message: 'Usuario eliminado correctamente',
                    duration: 2000,
                    color: 'success',
                  });
                  await toast.present();

                  // Actualizar la lista de usuarios
                  this.obtenerUsuarios();
                } else {
                  console.error('Error al eliminar el usuario:', response.error);
                }
              },
              async (error) => {
                console.error('Error en la solicitud:', error);
                const toast = await this.toastController.create({
                  message: 'Error al eliminar el usuario',
                  duration: 2000,
                  color: 'danger',
                });
                await toast.present();
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    localStorage.removeItem('adminId'); // Eliminar el ID del administrador del almacenamiento local
    this.router.navigate(['/admin']); // Redirigir a la página de inicio de sesión
    console.log('Sesión cerrada');
  }
}
