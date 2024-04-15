import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Pregunta } from '../interfaces/preguntasRespuestasFrecuentes';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private ApiURL;
  private apiprueba="https://513e0fad-543e-411c-b007-83227cc7fa7b.mock.pstmn.io";
  constructor(private http: HttpClient,private sanitizer: DomSanitizer) {
    this.ApiURL = environment.apiUrl;
   }

   obtenerCursos(personaId:number){
    return this.http.get<any>(`${this.ApiURL}/cursos/existen/${personaId}`).pipe(
			retry(2)
		);
   }

   obtenerVideosPreguntas(cursoId:number){
    return this.http.get<any>(`${this.ApiURL}/cursos/${cursoId}`).pipe(
			retry(2)
		);
   }

   obtenerEquipo(idUsuario:number){
    return this.http.get<any>(`${this.ApiURL}/usuario/organigrama/${idUsuario}`).pipe(
			retry(2)
		);
   }

   validarCuestionario(data: any){ 

    return this.http.get<any>(`${this.ApiURL}/cursos/verificar`, data).pipe(
      retry(2)
    );
  }

  obtenerVideoUrl(idVideo: number): SafeUrl {
    const videoUrl = `${this.ApiURL}/videos/video/${idVideo}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }


  registrarInteraccionVideo(data: any): Observable<any> {
    return this.http.post(`${this.ApiURL}/cursos`, data).pipe(
			retry(2)
		);
  }

  obtenerReunion(idUsuario: number) {
    return this.http.get(`${this.ApiURL}/reunion/${idUsuario}`).pipe(
			retry(2)
		);
  }

  preguntar(data:any){
    return this.http.post(`${this.apiprueba}/pregunta/recomendacion`, data).pipe(
			retry(2)
		);
  }

  getPreguntas(): Observable<Pregunta[]> {
      return this.http.get<Pregunta[]>(`${this.ApiURL}/preguntas`).pipe(
        retry(2)
      );;
  }
   
}
