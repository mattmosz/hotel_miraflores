import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { HabitacionesService } from '../servicio/habitaciones.service';
import { ReservasService } from '../servicio/reservas.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: false
})
export class ReservaPage implements OnInit {
  habitacionId?: number; // Declarar la propiedad como opcional
  habitacion: any; // Propiedad para almacenar los detalles de la habitación
  fechaInicio: string = new Date().toISOString();
  fechaSalida: string = new Date().toISOString();

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private habitacionesService: HabitacionesService, // Inyectar el servicio de habitaciones
    private reservasService: ReservasService // Inyectar el servicio de reservas
  ) { }

  ngOnInit() {
    this.habitacionId = this.navParams.get('habitacionId');
    console.log('Habitación ID:', this.habitacionId); // Agregar un console.log para verificar el ID

    if (this.habitacionId) {
      this.habitacionesService.getHabitacion(this.habitacionId).subscribe(habitacion => {
        this.habitacion = habitacion;
        console.log('Detalles de la habitación:', this.habitacion); // Verificar los detalles de la habitación
      }, error => {
        console.error('Error al obtener los detalles de la habitación:', error);
      });
    }
  }

  comprobarDisponibilidad() {
    if (this.habitacionId && this.fechaInicio && this.fechaSalida) {
      const fechaInicioFormatted = this.fechaInicio.split('T')[0]; // Formatear la fecha a YYYY-MM-DD
      const fechaSalidaFormatted = this.fechaSalida.split('T')[0]; // Formatear la fecha a YYYY-MM-DD
  
      this.reservasService.comprobarDisponibilidad(this.habitacionId, fechaInicioFormatted, fechaSalidaFormatted).subscribe(response => {
        console.log(fechaInicioFormatted);
        console.log('Respuesta de la API:', response); // Agregar un console.log para verificar la respuesta de la API
        if (response && response.disponible !== undefined) {
          if (response.disponible) {
            console.log('La habitación está disponible.');
            // Aquí puedes agregar lógica adicional, como mostrar un mensaje al usuario
          } else {
            console.log('La habitación no está disponible.');
            // Aquí puedes agregar lógica adicional, como mostrar un mensaje al usuario
          }
        } else {
          console.error('Respuesta de la API no válida:', response);
        }
      }, error => {
        console.error('Error al comprobar la disponibilidad:', error);
      });
    } else {
      console.error('Faltan datos para comprobar la disponibilidad.');
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }
}