import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  private ApiURL;
  constructor(private http: HttpClient) {
    this.ApiURL = environment.apiUrl;
   }

  guardarNotas(data:any){
    return this.http.post<any>(`${this.ApiURL}/usuario/block/`,data).pipe(
			retry(2)
		);
  }
  ObtenerNotas(idUsuario:number){
    return this.http.get<any>(`${this.ApiURL}/usuario/block/${idUsuario}`).pipe(
			retry(2)
		);
   }
}
