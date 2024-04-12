import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private ApiURL1;
  private ApiURL2;
  private ApiEquipo = "https://6be3274e-4706-4fc1-be55-dfacda2f4cc0.mock.pstmn.io"
  private ApiVerificar ='https://66091da3-df15-4d08-b37c-cb6e296cd304.mock.pstmn.io'

  constructor(private http: HttpClient) {
    this.ApiURL1 = "https://b08d2354-a57f-4621-a7c6-afe10a13af77.mock.pstmn.io";
    this.ApiURL2 = "https://028f0adf-d997-460d-8215-87ecb089b44d.mock.pstmn.io"
   }

   obtenerCursos(personaId:number){
    return this.http.get<any>(`${this.ApiURL1}/cursos/existen/${personaId}`).pipe(
			retry(2)
		);
   }

   obtenerVideosPreguntas(cursoId:number){
    return this.http.get<any>(`${this.ApiURL2}/cursos/${cursoId}`).pipe(
			retry(2)
		);
   }

   obtenerEquipo(idUsuario:number){
    return this.http.get<any>(`${this.ApiEquipo}/usuario/organigrama/${idUsuario}`).pipe(
			retry(2)
		);
   }

   validarCuestionario(data: any){
  
    return this.http.get<any>(`${this.ApiVerificar}/cursos`,data).pipe(
			retry(2)
		);
  }
   
}
