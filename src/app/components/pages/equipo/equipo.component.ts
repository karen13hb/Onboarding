import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {

  private idUsuario :number=0;
  public equipo: any =[]
  constructor(private cursosService:CursosService,private router: Router){

  }

  
  ngOnInit(): void {
    this.idUsuario =history.state.idUsuario
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
}
