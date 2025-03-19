import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../servicio/habitaciones.service';
import { ModalController } from '@ionic/angular';
import { ReservaPage } from '../reserva/reserva.page';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
  standalone: false
})
export class HabitacionesPage implements OnInit {
  habitaciones: any[] = [];

  constructor(private habitacionesService: HabitacionesService, private modalController: ModalController) { }

  ngOnInit() {
    this.habitacionesService.getHabitaciones().subscribe(data => {
      this.habitaciones = data;
    });
  }

  async openReservaModal(habitacionId: number) {
    this.habitacionesService.getHabitacion(habitacionId).subscribe(habitacion => {
      if (habitacion) {
        localStorage.setItem('idHabitacion', habitacion.id_habitacion);
        const modal = this.modalController.create({
          component: ReservaPage,
          componentProps: { habitacionId: habitacion.id_habitacion }
        });
        modal.then(m => m.present());
      } else {
        console.error('Habitación no encontrada');
      }
    }, error => {
      console.error('Error al obtener la habitación:', error);
    });
  }
}