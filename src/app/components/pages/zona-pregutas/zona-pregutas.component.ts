import { Component } from '@angular/core';
import { Pregunta } from 'src/app/interfaces/preguntasRespuestasFrecuentes';
import { CursosService } from 'src/app/services/cursos.service';


@Component({
  selector: 'app-zona-pregutas',
  templateUrl: './zona-pregutas.component.html',
  styleUrls: ['./zona-pregutas.component.css']
})
export class ZonaPregutasComponent {
  preguntas: Pregunta[] = [];

  constructor(private curso: CursosService) { }

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas(): void {
    this.curso.getPreguntas().subscribe({
      next: (data) => {
        this.preguntas = data;
      },
      error: (error) => {
        console.error('Error al cargar las preguntas', error);
      }
    });
  }

  nuevaPregunta = { titulo: '', descripcion: '' };

  agregarPregunta() {
    const nueva = {
      idPregunta: this.preguntas.length + 1,  
      titulo: this.nuevaPregunta.titulo,
      descripcion: this.nuevaPregunta.descripcion,
      respuestas: []
    };
    this.preguntas.push(nueva);
    this.nuevaPregunta = { titulo: '', descripcion: '' };
  }
}