import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../servicio/reservas.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // Solo este import es necesario

@Component({
  selector: 'app-reservas-admin',
  templateUrl: './reservas-admin.page.html',
  styleUrls: ['./reservas-admin.page.scss'],
  standalone: false,
})
export class ReservasAdminPage implements OnInit {
  reservas: any[] = [];
  filtro: string = 'activas';
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private reservasService: ReservasService, private router: Router) {}

  ngOnInit() {
    this.obtenerReservas();
  }

  cambiarFiltro(event: any) {
    this.filtro = event.detail.value;
    if (this.filtro !== 'reportes') {
      this.obtenerReservas();
    }
  }

  

  obtenerReservas() {
    if (this.filtro === 'activas') {
      this.reservasService.reservasActivas().subscribe(
        (response: any[]) => {
          this.reservas = response || [];
          console.log('Reservas activas:', this.reservas);
        },
        (error: any) => {
          console.error('Error al obtener las reservas activas:', error);
        }
      );
    } else if (this.filtro === 'historial') {
      this.reservasService.todos().subscribe(
        (response: any[]) => {
          this.reservas = response || [];
          console.log('Historial de reservas:', this.reservas);
        },
        (error: any) => {
          console.error('Error al obtener el historial de reservas:', error);
        }
      );
    }
    // No es necesario un else para 'reportes' si no se hace nada
  }

  logout() {
    localStorage.removeItem('adminId');
    this.router.navigate(['/admin']);
    console.log('Sesión cerrada');
  }

  buscarReservasPorFechas() {
    if (!this.fechaInicio || !this.fechaFin) {
      console.error('Debe seleccionar ambas fechas');
      return;
    }

    this.reservasService.reservasPorFechas(this.fechaInicio, this.fechaFin).subscribe(
      (response: any[]) => {
        this.reservas = response || [];
        console.log('Reservas por fechas:', this.reservas);
      },
      (error: any) => {
        console.error('Error al obtener reservas por fechas:', error);
      }
    );
  }

  generarPDF() {
    const doc = new jsPDF();
    doc.text('Reporte de Reservas', 10, 10);

    const rows = this.reservas.map((reserva) => [
      reserva.numero_reserva,
      `${reserva.nombre_usuario} ${reserva.apellido_usuario}`,
      reserva.estilo_habitacion,
      reserva.fecha_inicio,
      reserva.fecha_salida,
      reserva.total_reserva,
    ]);

    autoTable(doc, {
      head: [['Número', 'Cliente', 'Habitación', 'Fecha Inicio', 'Fecha Salida', 'Total']],
      body: rows,
    });

    doc.save('reporte_reservas.pdf');
  }
}

