import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

  idPersona!:any;
  public cursos: any =[]
  public siguiente = true;
  constructor(private cursosService:CursosService,private router: Router){

  }

  ngOnInit(): void {  
   
    this.idPersona = history.state.idUser; 
    this.obtenerCursos();
    this.habilitarPaso();
  }

  


  public obtenerCursos():void {
    this.cursosService.obtenerCursos(this.idPersona).subscribe({
      next: (response) => {
        this.cursos =response.cursos;
      },
      error: (error) => {
        console.error('Error obtener cursos', error);
      }
    });
  }

  public redirecToCurso(idCurso:number,descripcion:string,nombre:string){
    const Data = { idCurso: idCurso, descripcion:descripcion,nombre:nombre,idUsuario:this.idPersona};
    this.router.navigate(['cursos/detalle'], { state: Data });  

  }

  
  public habilitarPaso(){
    this.cursosService.finalizarCursos(this.idPersona).subscribe({
      next: (response) => {
        this.siguiente = !response.verificado
      },
      error: (error) => {
        console.error('Error obtener cursos', error);
      }
    });
   
  }
  


  public siguientePaso(){
    const Data = { idUsuario: this.idPersona };
    this.router.navigate(['cursos/usuario/equipo'], { state: Data });
   
  }
  
}
