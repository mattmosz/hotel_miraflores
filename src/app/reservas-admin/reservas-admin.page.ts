import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../servicio/reservas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservas-admin',
  templateUrl: './reservas-admin.page.html',
  styleUrls: ['./reservas-admin.page.scss'],
  standalone: false
})
export class ReservasAdminPage implements OnInit {
  reservas: any[] = []; // Lista de reservas
  filtro: string = 'activas'; // Filtro inicial (reservas activas)

  constructor(private reservasService: ReservasService, private router : Router) {}

  ngOnInit() {
    this.obtenerReservas(); // Cargar las reservas al iniciar la página
  }

  cambiarFiltro(event: any) {
    this.filtro = event.detail.value; // Actualizar el filtro según el segmento seleccionado
    this.obtenerReservas(); // Volver a cargar las reservas
  }

  obtenerReservas() {
    if (this.filtro === 'activas') {
      this.reservasService.reservasActivas().subscribe(
        (response: any[]) => { 
          this.reservas = response || []; 
          console.log('Reservas activas:', this.reservas);
        },
        (error) => {
          console.error('Error al obtener las reservas activas:', error);
        }
      );
    } else if (this.filtro === 'historial') {
      this.reservasService.todos().subscribe(
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

  logout() {
    localStorage.removeItem('adminId'); // Eliminar el ID del administrador del almacenamiento local
    this.router.navigate(['/admin']); // Redirigir a la página de inicio de sesión
    console.log('Sesión cerrada');
  }
}
