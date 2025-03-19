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
  idHabitacion: number = 0; // ID de la habitación seleccionada
  idUsuario: number = 0; // ID del usuario que inició sesión
  fechaInicio: string = ''; // Fecha de inicio de la reserva
  fechaSalida: string = ''; // Fecha de salida de la reserva
  totalReserva: number = 0; // Total calculado de la reserva
  numeroReserva: string = ''; // Código de reserva generado
  estiloHabitacion: string = ''; // Estilo de la habitación
  fotoHabitacion: string = ''; // Fotografía de la habitación
  nombreUsuario: string = ''; // Nombre del usuario
  apellidoUsuario: string = ''; // Apellido del usuario
  precioNoche: number = 0; // Precio por noche de la habitación

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
    const reserva = {
      fecha_inicio: this.fechaInicio,
      fecha_salida: this.fechaSalida,
      id_habitacion: this.idHabitacion,
      id_usuario: this.idUsuario
    };

    this.reservasService.insertarReserva(reserva).subscribe(response => {
      if (response.success) {
        console.log('Reserva registrada con éxito:', response);
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
      } else {
        console.error('Error al registrar la reserva:', response.error);
      }
    }, error => {
      console.error('Error en la solicitud de registro de reserva:', error);
    });
  }
}