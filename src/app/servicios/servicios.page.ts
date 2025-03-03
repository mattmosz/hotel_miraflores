import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicio/servicios.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: false
})
export class ServiciosPage implements OnInit {
  servicios: any[] = [];

  constructor(private serviciosService: ServiciosService) { }

  ngOnInit() {
    this.serviciosService.getServicios().subscribe(data => {
      this.servicios = data;
    });
  }
}
