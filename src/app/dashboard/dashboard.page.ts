import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../servicio/reservas.service';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';
import { HabitacionesService } from '../servicio/habitaciones.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  totalClientes: number = 0; // Variable para almacenar el total de clientes
  totalReservas: number = 0; // Variable para almacenar el total de reservas
  totalHabitaciones: number = 0; // Variable para almacenar el total de habitaciones
  constructor(private reservasService: ReservasService, private router: Router, private usuariosService : UsuariosService, private habitacionesService : HabitacionesService) {}

  ngOnInit() {
    this.obtenerTotalReservas(); // Llamar a la función al iniciar la página
    this.obtenerTotalClientes(); // Llamar a la función al iniciar la página
    this.obtenerTotalHabitaciones(); // Llamar a la función al iniciar la página
  }

  obtenerTotalReservas() {
    this.reservasService.getTotalReservas().subscribe(
      (response: any) => {
        this.totalReservas = response.total_reservas || 0; // Asignar el total de reservas
        console.log('Total de reservas:', this.totalReservas);
      },
      (error) => {
        console.error('Error al obtener el total de reservas:', error);
      }
    );
  }

  obtenerTotalClientes() {
    this.usuariosService.getTotalClientes().subscribe(
      (response: any) => {
        this.totalClientes = response.total || 0; // Asignar el total de clientes
        console.log('Total de clientes:', this.totalClientes);
      },
      (error) => {
        console.error('Error al obtener el total de clientes:', error);
      }
    );
  }

  obtenerTotalHabitaciones() {
    this.habitacionesService.getTotalHabitaciones().subscribe(
      (response: any) => {
        this.totalHabitaciones = response.total || 0; // Asignar el total de habitaciones
        console.log('Total de habitaciones:', this.totalHabitaciones);
      },
      (error) => {
        console.error('Error al obtener el total de habitaciones:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('adminId'); // Eliminar el ID del administrador del almacenamiento local
    this.router.navigate(['/admin']); // Redirigir a la página de inicio de sesión
    console.log('Sesión cerrada');
  }
}