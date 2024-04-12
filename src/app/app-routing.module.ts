import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './components/pages/cursos/cursos.component';
import { NavComponent } from './layout/nav/nav.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DetalleCursoComponent } from './components/pages/detalle-curso/detalle-curso.component';
import { EquipoComponent } from './components/pages/equipo/equipo.component';


const routes: Routes = [

  
    {
      path:'', 
      component:NavigationComponent,
      children:[
        {
          path:'', component:EquipoComponent
        },
        {
          path:'cursos', component:CursosComponent
        },
        {
          path:'curso/detalle', component:DetalleCursoComponent
        },
        {
          path:'usuario/equipo', component:EquipoComponent
        },
      ]
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
