import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private ApiURL;
  constructor(private http: HttpClient) {
    this.ApiURL = environment.apiUrl;
   }

   crearUsuario(data: any ){
    return this.http.post<any>(`${this.ApiURL}/usuario`,data).pipe(
			retry(2)
		);
   }

   obtenerPreguntasPersonales(){
    return this.http.get<any>(`${this.ApiURL}/cursos/preguntas/personal`).pipe(
			retry(2)
		);
   }
}
