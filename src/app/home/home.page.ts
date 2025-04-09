import { Component, OnInit } from '@angular/core';
import { HabitacionesService } from '../servicio/habitaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  habitaciones: any[] = [];

  constructor(private habitacionesService: HabitacionesService, private router : Router) { }

  ngOnInit() {
    this.habitacionesService.getHabitaciones().subscribe(data => {
      this.habitaciones = data;
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login'], { queryParams: { redirectTo: 'perfil' } });
  }
}