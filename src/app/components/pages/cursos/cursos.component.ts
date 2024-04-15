import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {

  idPersona!:any;
  public cursos: any =[];
  mensaje:string | null = null;
  constructor(private cursosService:CursosService,
    private router: Router,
    private usuarioService: UsuarioService,private authService: AuthService,){

  }

  ngOnInit(): void {  
   
    this.idPersona = this.authService.decodeToken()
    this.obtenerCursos();
    console.log(this.idPersona)
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
    this.mensaje =null;
    this.cursosService.finalizarCursos(this.idPersona).subscribe({
      next: (response) => {
        if(response.verificado){
          this.siguientePaso()
        }else{
          this.mensaje ="debes finalizar todos tus cursos";
        }
        
      },
      error: (error) => {
        console.error('Error obtener cursos', error);
      }
    });
   
  }
  


  public siguientePaso(){
    this.router.navigate(['cursos/usuario/equipo'],);
   
  }
  
}
