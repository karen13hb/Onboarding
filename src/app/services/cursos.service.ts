import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Pregunta } from '../interfaces/preguntasRespuestasFrecuentes';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private ApiURL;
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
    return this.http.post<any>(`${this.ApiURL}/cursos/verificar`, data).pipe(
      retry(2)
    );
  }

  finalizarCursos(idUsuario:number){
    return this.http.get<any>(`${this.ApiURL}/cursos/finalizar/${idUsuario}`).pipe(
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
    let params = new HttpParams();
    console.log(data)
    params = params.set('query', data.text);

    return this.http.get(`${this.ApiURL}/preguntas/buscar`, { params: params }).pipe(
      retry(2),
      catchError(error => {
        console.error('Error al realizar la petición:', error);
        return of("sin respuesta");
      })
    );
  }

  getPreguntas(): Observable<Pregunta[]> {
      return this.http.get<Pregunta[]>(`${this.ApiURL}/preguntas`).pipe(
        retry(2)
      );;
  }
   
}
