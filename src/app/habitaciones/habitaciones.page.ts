import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../servicio/habitaciones.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.page.html',
  styleUrls: ['./habitaciones.page.scss'],
  standalone: false
})
export class HabitacionesPage implements OnInit {
  habitaciones: any[] = [];

  constructor(private habitacionesService: HabitacionesService) { }

  ngOnInit() {
    this.habitacionesService.getHabitaciones().subscribe(data => {
      this.habitaciones = data;
    });
  }
}
