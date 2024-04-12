import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

  idPersona =1;
  public cursos: any =[]
  public siguiente = false; // si el servicio retorna true habilita el boton
  constructor(private cursosService:CursosService,private router: Router){

  }

  ngOnInit(): void {
    
    this.obtenerCursos();
    console.log(this.idPersona)
  }

  


  public obtenerCursos():void {
    this.cursosService.obtenerCursos(this.idPersona).subscribe({
      next: (response) => {
        this.cursos =response.cursos;
        console.log(this.cursos)
      },
      error: (error) => {
        console.error('Error al crear la reserva', error);
      }
    });
  }

  public redirecToCurso(idCurso:number,descripcion:string,nombre:string){
    
    const Data = { idCurso: idCurso, descripcion:descripcion,nombre:nombre,idUsuario:this.idPersona};
    this.router.navigate(['curso/detalle'], { state: Data });  

  }

  public siguientePaso(){
    const Data = { idUsuario: this.idPersona };
    this.router.navigate(['usuario/equipo'], { state: Data });
  }

}