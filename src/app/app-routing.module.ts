import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './components/pages/cursos/cursos.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DetalleCursoComponent } from './components/pages/detalle-curso/detalle-curso.component';
import { EquipoComponent } from './components/pages/equipo/equipo.component';
import { ReunionComponent } from './components/pages/reunion/reunion.component';
import { FormularioComponent } from './components/pages/formulario/formulario.component';
import { LoginComponent } from './components/login/login.component';
import { ZonaPregutasComponent } from './components/pages/zona-pregutas/zona-pregutas.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';


const routes: Routes = [
    
    {
      
      path:'', 
      component:SkeletonComponent,
      children:[
        {
          path:'', component:LoginComponent
        }, 
        {
          path:'cursos', component:NavigationComponent,
          children:[
            {
              path:'', component:CursosComponent
            },
            {
              path:'formulario', component:FormularioComponent
            },
            {
              path:'zonapreguntas', component:ZonaPregutasComponent
            },
            {
              path:'all', component:CursosComponent
            },
            {
              path:'detalle', component:DetalleCursoComponent
            },
            {
              path:'usuario/equipo', component:EquipoComponent
            },
            {
              path:'usuario/reunion', component:ReunionComponent
            },

          ]

        }, 
       
      ]
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
