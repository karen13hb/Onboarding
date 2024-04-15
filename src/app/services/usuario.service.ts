import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private ApiURL;
  idUsuario:any;
  constructor(private http: HttpClient) {
    this.ApiURL = environment.apiUrl;
   }

   setId(id: any){
    this.idUsuario = id;
   }
   getId():any{
    return this.idUsuario;
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
