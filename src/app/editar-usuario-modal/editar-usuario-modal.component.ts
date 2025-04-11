import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
    private modalController: ModalController
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

  guardarCambios() {
    console.log('Datos actualizados:', this.usuario);
    this.modalController.dismiss(this.usuario); // Cierra el modal y devuelve los datos actualizados
  }

  cerrarModal() {
    this.modalController.dismiss(); // Cierra el modal sin guardar cambios
  }
}
