import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { HabitacionesService } from '../servicio/habitaciones.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: false
})
export class ReservaPage implements OnInit {
  habitacionId?: number; // Declarar la propiedad como opcional
  habitacion: any; // Propiedad para almacenar los detalles de la habitación

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private habitacionesService: HabitacionesService // Inyectar el servicio de habitaciones
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

  closeModal() {
    this.modalController.dismiss();
  }
}
