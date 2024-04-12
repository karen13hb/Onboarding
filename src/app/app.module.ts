import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CursosComponent } from './components/pages/cursos/cursos.component';
import { DetalleCursoComponent } from './components/pages/detalle-curso/detalle-curso.component';
import { VideoComponent } from './shared/video/video.component';
import { NavComponent } from './layout/nav/nav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { EquipoComponent } from './components/pages/equipo/equipo.component';
import { ModalCuestionarioComponent } from './components/Modals/modal-cuestionario/modal-cuestionario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReunionComponent } from './components/pages/reunion/reunion.component';
import { ModalEncuestaComponent } from './components/Modals/modal-encuesta/modal-encuesta.component';



@NgModule({
  declarations: [
    AppComponent,
    CursosComponent,
    DetalleCursoComponent,
    VideoComponent,
    NavComponent,
    FooterComponent,
    NavigationComponent,
    EquipoComponent,
    ModalCuestionarioComponent,
    ReunionComponent,
    ModalEncuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

