import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicio/usuarios.service';
import { ReservasService } from '../servicio/reservas.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  nombreUsuario: string = ''; // Variable para almacenar el nombre del usuario
  apellidoUsuario: string = ''; // Variable para almacenar el apellido del usuario
  reservas: any[] = []; // Lista de reservas del usuario
  filtro: string = 'activas'; // Filtro inicial (reservas activas)

  constructor(
    private usuariosService: UsuariosService,
    private reservasService: ReservasService,
    private menu: MenuController
  ) {}

  ngOnInit() {
    this.menu.enable(true); // Habilitar el menú lateral
    const idUsuario = localStorage.getItem('idUsuario'); // Obtener el ID del usuario desde localStorage
    if (idUsuario) {
      const id = parseInt(idUsuario, 10);
      this.obtenerUsuario(id); // Obtener los datos del usuario
      this.obtenerReservas(id); // Obtener las reservas según el filtro inicial
    }
    
  }

  cambiarFiltro(event: any) {
    this.filtro = event.detail.value; // Actualizar el filtro según el segmento seleccionado
    const idUsuario = localStorage.getItem('idUsuario');
    if (idUsuario) {
      const id = parseInt(idUsuario, 10);
      this.obtenerReservas(id); // Volver a cargar las reservas según el filtro
    }
  }

  obtenerUsuario(idUsuario: number) {
    this.usuariosService.getUsuario(idUsuario).subscribe(
      (response: any) => {
        if (response) {
          this.nombreUsuario = response.nombre_usuario; // Asignar el nombre del usuario
          this.apellidoUsuario = response.apellido_usuario; // Asignar el apellido del usuario
          console.log('Usuario obtenido:', response);
        }
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  obtenerReservas(idUsuario: number) {
    if (this.filtro === 'activas') {
      this.reservasService.reservasPorUsuarioActivas(idUsuario).subscribe(
        (response: any[]) => {
          this.reservas = response || []; // Asignar las reservas activas
          console.log('Reservas activas:', this.reservas);
        },
        (error) => {
          console.error('Error al obtener las reservas activas:', error);
        }
      );
    } else if (this.filtro === 'historial') {
      this.reservasService.reservasPorUsuario(idUsuario).subscribe(
        (response: any[]) => {
          this.reservas = response || []; // Asignar el historial de reservas
          console.log('Historial de reservas:', this.reservas);
        },
        (error) => {
          console.error('Error al obtener el historial de reservas:', error);
        }
      );
    }
  }

  cerrarSesion() {
    localStorage.removeItem('idUsuario'); // Limpiar el almacenamiento local
    this.nombreUsuario = ''; // Limpiar el nombre del usuario
    this.apellidoUsuario = ''; // Limpiar el apellido del usuario
    this.reservas = []; // Limpiar la lista de reservas
  }
}
