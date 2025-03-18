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
  habitacionId?: number;
  habitacion: any;
  fechaInicio: string = new Date().toISOString();
  fechaSalida: string = new Date().toISOString();
  habitacionDisponible: boolean = false; // Nueva variable para controlar la visibilidad del botón

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private habitacionesService: HabitacionesService,
    private reservasService: ReservasService
  ) { }

  ngOnInit() {
    this.habitacionId = this.navParams.get('habitacionId');

    if (this.habitacionId) {
      this.habitacionesService.getHabitacion(this.habitacionId).subscribe(habitacion => {
        this.habitacion = habitacion;
      }, error => {
        console.error('Error al obtener los detalles de la habitación:', error);
      });
    }
  }

  comprobarDisponibilidad() {
    if (this.habitacionId && this.fechaInicio && this.fechaSalida) {
      const fechaInicioFormatted = this.fechaInicio.split('T')[0];
      const fechaSalidaFormatted = this.fechaSalida.split('T')[0];

      this.reservasService.comprobarDisponibilidad(this.habitacionId, fechaInicioFormatted, fechaSalidaFormatted).subscribe(response => {
        if (response && response.disponible !== undefined) {
          this.habitacionDisponible = response.disponible; // Actualizar la visibilidad del botón
          if (response.disponible) {
            const toast = document.createElement('ion-toast');
            toast.message = '¡La habitación está disponible para las fechas seleccionadas!';
            toast.duration = 2000;
            toast.color = 'success';
            document.body.appendChild(toast);
            toast.present();
          } else {
            const toast = document.createElement('ion-toast');
            toast.message = 'La habitación no está disponible para las fechas seleccionadas.';
            toast.duration = 2000;
            toast.color = 'danger';
            document.body.appendChild(toast);
            toast.present();
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

  iniciarSesion() {
    
  }
}