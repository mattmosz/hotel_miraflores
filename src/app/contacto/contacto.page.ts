import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../servicio/empresa.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: false
})
export class ContactoPage implements OnInit {
  empresa: any;

  constructor(private empresaService: EmpresaService) { }

  ngOnInit() {
    this.empresaService.getEmpresa().subscribe(data => {
      if (data && data.length > 0) {
        this.empresa = data[0];
      }
    });
  }
}