import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import { UsuarioService } from './usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ApiURL;
  constructor(private http: HttpClient,private usuarioService: UsuarioService) { 
    this.ApiURL = environment.apiUrl;
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.ApiURL}/usuario/login`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

   setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  
  decodeToken(): string | null {
    const token: string | null = this.getToken();
    
    if (token) {
      const tokenPayload = jwtDecode(token);
      this.usuarioService.setId(tokenPayload.sub);
      return tokenPayload.sub || null;  
      
    }
    
    return null;
  }
}
