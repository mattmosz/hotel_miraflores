import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-editar-usuario-modal',
  templateUrl: './editar-usuario-modal.component.html',
  styleUrls: ['./editar-usuario-modal.component.scss'],
  standalone: false
})
export class EditarUsuarioModalComponent implements OnInit {
  @Input() idUsuario!: number; // Recibe el ID del usuario desde el componente padre
  usuario: any = {}; // Almacena los datos del usuario

  constructor(
    private usuariosService: UsuariosService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    this.usuariosService.getUsuario(this.idUsuario).subscribe(
      (response: any) => {
        if (response && response.id_usuario) {
          this.usuario = response; // Asignar los datos del usuario
          console.log('Usuario cargado:', this.usuario); // Verificar los datos en la consola
        } else {
          console.error('Usuario no encontrado:', response);
        }
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
      }
    );
  }

  async guardarCambios() {
    this.usuariosService.actualizarUsuario(this.usuario).subscribe(
      async (response: any) => {
        if (response.success) {
          // Mostrar un Toast con el mensaje de éxito
          const toast = await this.toastController.create({
            message: 'Usuario actualizado correctamente',
            duration: 2000,
            color: 'success',
          });
          await toast.present();

          // Cerrar el modal y devolver los datos actualizados
          this.modalController.dismiss(this.usuario);
        } else {
          console.error('Error al actualizar el usuario:', response.error);
        }
      },
      async (error) => {
        console.error('Error en la solicitud:', error);
        const toast = await this.toastController.create({
          message: 'Error al actualizar el usuario',
          duration: 2000,
          color: 'danger',
        });
        await toast.present();
      }
    );
  }

  cerrarModal() {
    this.modalController.dismiss(); // Cierra el modal sin guardar cambios
  }
}
