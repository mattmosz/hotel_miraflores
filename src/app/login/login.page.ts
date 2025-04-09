import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from '../servicio/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  correo_usuario: string = '';
  clave_usuario: string = '';
  redirectTo: string = 'checkout'; // Valor por defecto

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['redirectTo']) {
        this.redirectTo = params['redirectTo'];
      }
    });
  }

  login() {
    if (this.correo_usuario && this.clave_usuario) {
      this.usuariosService.login(this.correo_usuario, this.clave_usuario).subscribe(response => {
        if (response && response.id_usuario) {
          console.log('¡Inicio de sesión correcto!', response);
          localStorage.setItem('idUsuario', response.id_usuario);
          this.router.navigate([`/${this.redirectTo}`]);
        } else {
          console.error('¡Inicio de sesión incorrecto!', response);
        }
      }, error => {
        console.error('¡Error al iniciar sesión!', error);
      });
    }
  }

  register() {
    this.router.navigate(['/registro']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }
}



