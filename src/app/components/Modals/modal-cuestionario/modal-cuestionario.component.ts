import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pregunta } from '../../../interfaces/preguntaRespuesta';
import { CursosService } from 'src/app/services/cursos.service';



@Component({
  selector: 'app-modal-cuestionario',
  templateUrl: './modal-cuestionario.component.html',
  styleUrls: ['./modal-cuestionario.component.css']
})
export class ModalCuestionarioComponent {
  public activeModal: NgbActiveModal;
  public preguntas: Pregunta[] =[];
  public idUsuario=0;
  public idCurso=0;
  public respuesta:any =[];
  public disabled =false;

  respuestasSeleccionadas: { [idPregunta: number]: number } = {};

  constructor(public activeModals: NgbActiveModal,private cursosService:CursosService){
    this.activeModal = activeModals	
  }


  validarFormulario() {
    const datosEnviar = {
      idCurso :this.idCurso,
      idUsuario :this.idUsuario,
      preguntas: this.preguntas.map(pregunta=> ({
        idPregunta: pregunta.idPregunta,
        respuestas: pregunta.respuestas.filter(respuesta => respuesta.idRespuesta === this.respuestasSeleccionadas[pregunta.idPregunta]).map(respuesta => ({
          idRespuesta: respuesta.idRespuesta,
          respondio: true
        }))
      })).filter(pregunta => pregunta.respuestas.length > 0)
    };
    this.cursosService.validarCuestionario(datosEnviar).subscribe({
      next: (response) => {
        this.respuesta =response;
        this.disabled=true;
      },
      error: (error) => {
        console.error('Error al enviar las respuestas', error);
      }
    });

   
  }

  esRespuestaCorrecta(idPregunta: number): boolean {
    const respuestasRecibidas = this.respuesta[idPregunta];
    if (respuestasRecibidas && respuestasRecibidas[0] && !respuestasRecibidas[0].esCorrecta) {
      return false; 
    }
    return true; 
  }//falta deshabilitar los botones de input y de enviar
    
  


}
