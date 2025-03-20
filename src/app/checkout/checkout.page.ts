import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../servicio/reservas.service';
import { HabitacionesService } from '../servicio/habitaciones.service';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: false
})
export class CheckoutPage implements OnInit {
  idHabitacion: number = 0; 
  idUsuario: number = 0; 
  fechaInicio: string = ''; 
  fechaSalida: string = ''; 
  totalReserva: number = 0; 
  numeroReserva: string = ''; 
  estiloHabitacion: string = ''; 
  fotoHabitacion: string = ''; 
  nombreUsuario: string = ''; 
  apellidoUsuario: string = ''; 
  precioNoche: number = 0; 

  constructor(
    private reservasService: ReservasService,
    private habitacionesService: HabitacionesService,
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    // Obtener los datos necesarios desde el almacenamiento local
    this.idHabitacion = parseInt(localStorage.getItem('idHabitacion') || '0', 10);
    this.idUsuario = parseInt(localStorage.getItem('idUsuario') || '0', 10);
    this.fechaInicio = localStorage.getItem('fechaInicio') || '';
    this.fechaSalida = localStorage.getItem('fechaSalida') || '';

    // Obtener los detalles de la habitación
    this.habitacionesService.getHabitacion(this.idHabitacion).subscribe(habitacion => {
      this.estiloHabitacion = habitacion.estilo_habitacion;
      this.fotoHabitacion = habitacion.foto_habitacion;
      this.precioNoche = habitacion.precio_noche;

      // Calcular el total de la reserva
      this.calcularTotal();
    });

    // Obtener los detalles del usuario
    this.usuariosService.getUsuario(this.idUsuario).subscribe(usuario => {
      this.nombreUsuario = usuario.nombre_usuario;
      this.apellidoUsuario = usuario.apellido_usuario;
    });

    // Generar el número de reserva
    this.generarNumeroReserva();
  }

  calcularTotal() {
    const fechaInicio = new Date(this.fechaInicio);
    const fechaSalida = new Date(this.fechaSalida);
    const dias = (fechaSalida.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24);
    this.totalReserva = dias * this.precioNoche;
  }

  generarNumeroReserva() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.numeroReserva = Array.from({ length: 10 }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');
  }

  confirmarReserva() {
    // Formatear las fechas para que sean solo de tipo "YYYY-MM-DD"
    const fechaInicioFormatted = this.fechaInicio.split('T')[0];
    const fechaSalidaFormatted = this.fechaSalida.split('T')[0];
  
    // Calcular el total de la reserva
    const fechaInicio = new Date(this.fechaInicio);
    const fechaSalida = new Date(this.fechaSalida);
    const dias = (fechaSalida.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24);
    const totalReserva = parseFloat((dias * this.precioNoche).toFixed(2)); // Formatear a dos decimales
  
    // Generar el número de reserva
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const numeroReserva = Array.from({ length: 10 }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');
  
    // Crear el objeto de reserva con el campo estado_reserva
    const reserva = {
      fecha_inicio: fechaInicioFormatted,
      fecha_salida: fechaSalidaFormatted,
      id_habitacion: this.idHabitacion,
      id_usuario: this.idUsuario,
      total_reserva: totalReserva,
      numero_reserva: numeroReserva,
      estado_reserva: 1 // Valor predeterminado
    };
  
    console.log('Datos enviados al servicio:', reserva); // Verificar los datos enviados
  
    this.reservasService.insertarReserva(reserva).subscribe(response => {
      if (response.success) {
        console.log('Reserva registrada con éxito:', response);
        
      } else {
        console.error('Error al registrar la reserva:', response.error);
      }
    }, error => {
      console.error('Error en la solicitud de registro de reserva:', error);
    });
  }
}