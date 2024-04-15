import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {

  private idUsuario!:any;
  public equipo: any =[]
  constructor(private cursosService:CursosService,private router: Router,private authService: AuthService,){

  }

  
  ngOnInit(): void {
    this.idUsuario = this.authService.decodeToken()
    this.obtenerEquipo();
    
  }

  public obtenerEquipo():void {
    this.cursosService.obtenerEquipo(this.idUsuario).subscribe({
      next: (response) => {
        this.equipo =response;
      },
      error: (error) => {
        console.error('Error obtener equipo', error);
      }
    });
  }
  siguientePaso(){
    this.router.navigate(['cursos/usuario/reunion']);
  }
}
