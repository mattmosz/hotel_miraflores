import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../servicio/reservas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  totalReservas: number = 0; // Variable para almacenar el total de reservas
  constructor(private reservasService: ReservasService, private router: Router) {}

  ngOnInit() {
    this.obtenerTotalReservas(); // Llamar a la función al iniciar la página
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

  logout() {
    localStorage.removeItem('adminId'); // Eliminar el ID del administrador del almacenamiento local
    this.router.navigate(['/admin']); // Redirigir a la página de inicio de sesión
    console.log('Sesión cerrada');
  }
}