import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TabsComponent,
        children: [
          {
            path: 'home',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'habitaciones',
            loadChildren: () => import('../habitaciones/habitaciones.module').then(m => m.HabitacionesPageModule)
          },
          {
            path: 'servicios',
            loadChildren: () => import('../servicios/servicios.module').then(m => m.ServiciosPageModule)
          },
          {
            path: 'contacto',
            loadChildren: () => import('../contacto/contacto.module').then(m => m.ContactoPageModule)
          },
          {
            path: '',
            redirectTo: 'home',
            pathMatch: 'full'
          }
        ]
      }
    ])
  ],
  declarations: [TabsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsModule {}