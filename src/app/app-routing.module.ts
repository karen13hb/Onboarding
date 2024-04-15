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
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
    
    {
      
      path:'', 
      component:SkeletonComponent,
      children:[
        {
          path:'', component:HomeComponent
        }, 
        {
          path:'login', component:LoginComponent
        }, 
        {
          path:'registro', component:FormularioComponent
        },
        {
          path:'cursos', component:NavigationComponent,
          canActivate: [authGuard],
          children:[
            {
              path:'', component:CursosComponent
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
