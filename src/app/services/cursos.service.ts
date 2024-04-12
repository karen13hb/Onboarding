import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

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
  
    return this.http.get<any>(`${this.ApiURL}/cursos`,data).pipe(
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
   
}
