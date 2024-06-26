import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCuestionarioComponent } from '../../Modals/modal-cuestionario/modal-cuestionario.component';
import {  SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-curso',
  templateUrl: './detalle-curso.component.html',
  styleUrls: ['./detalle-curso.component.css']
})
export class DetalleCursoComponent {
  videoKey =0;
  idVideo=0;
  idCurso = 0;
  idUsuario = 0;
  public videos: any = []
  public cuestionario: any = []
  public descripcion = "";
  public titulo = ""
  videoUrl!: SafeUrl;

  constructor(private cursosService: CursosService, private router: Router, private modalService: NgbModal) {

  }

  ngOnInit(): void {
    
    this.idCurso = history.state.idCurso;
    this.descripcion = history.state.descripcion;
    this.titulo = history.state.nombre;
    this.idUsuario = history.state.idUsuario; 
    this.obtenerVideoCuestionario();

  }
  obtenerVideo(idVideo:number): void {  
    this.videoUrl ='';
    setTimeout(() => {
      this.videoUrl = this.cursosService.obtenerVideoUrl(idVideo); 
    }, 0);
    this.idVideo= idVideo;

  }

  onSeeking(video: HTMLVideoElement) {
    console.log(`Seeking at ${video.currentTime}`); 
  }

  onSeeked(video: HTMLVideoElement) {
    console.log(video.currentTime)
    this.sendVideoInteraction(video.currentTime);
  }

  sendVideoInteraction(currentTime: number) {
    const interactionData = {
      idUsuario: this.idUsuario,
      segundo: Math.floor(currentTime),
      idVideo: this.idVideo
    };

    this.cursosService.registrarInteraccionVideo(interactionData).subscribe({
      next: (response) => console.log('Interacción registrada', response),
      error: (error) => console.error('Error al registrar interacción', error)
    });
  }

  public obtenerVideoCuestionario(): void {
  
    this.cursosService.obtenerVideosPreguntas(this.idCurso).subscribe({
      next: (response) => {
        this.videos = response.videos;
        this.cuestionario = response.preguntas
        this.videos[0].idVideo
        this.obtenerVideo(this.videos[0].idVideo);
        this.idVideo = this.videos[0].idVideo
      },
      error: (error) => {
        console.error('Error obtener videos y cuestionario', error);
      }
    });
  }

  openDialog() {
    const modalRef = this.modalService.open(ModalCuestionarioComponent, {
      centered: true,
      backdropClass: "light-blue-backdrop",
      backdrop: "static",
      size: 'lg'
    });

    modalRef.componentInstance.preguntas = this.cuestionario;
    modalRef.componentInstance.idUsuario = this.idUsuario;
    modalRef.componentInstance.idCurso = this.idCurso;
  }
}
