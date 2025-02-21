import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../servicio/habitaciones.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  habitaciones: any[] = [];

  constructor(private habitacionesService: HabitacionesService) { }

  ngOnInit() {
    this.habitacionesService.getHabitaciones().subscribe(data => {
      this.habitaciones = data;
    });
  }
}