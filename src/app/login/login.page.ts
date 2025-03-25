import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../servicio/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})


export class LoginPage implements OnInit {

  correo_usuario: string = '';
  clave_usuario: string = '';
  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.correo_usuario && this.clave_usuario) {
      this.usuariosService.login(this.correo_usuario, this.clave_usuario).subscribe(response => {
        if (response && response.id_usuario) {
          console.log('¡Inicio de sesión correcto!', response);
          localStorage.setItem('idUsuario', response.id_usuario);
          this.router.navigate(['/checkout']);
        } else {
          console.error('¡Inicio de sesión incorrecto!', response);
        }
      }, error => {
        console.error('¡Error al iniciar sesión!', error);
      });
    }
  }

  register(){

    this.router.navigate(['/registro']);

  }


  cancel() {
      this.router.navigate(['/home']);
  }

}


