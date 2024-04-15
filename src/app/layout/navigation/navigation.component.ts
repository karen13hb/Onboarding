import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CursosService } from 'src/app/services/cursos.service';
import { NotasService } from 'src/app/services/notas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  idPersona!:any;
  selectedTab: string = 'cursos';
  mostrarNotas: boolean = false;
  preguntar:boolean =false;
  contenidoNota: string = '';
  notasInfo: any;
  pregunta: string = '';
  respuestaPregunta :any=[];
  defaultResponse={
    respuesta:"No resuelve mi pregunta"
  };
  defaultShow = false;
  constructor(private notasService:NotasService,
    private cursosService: CursosService,
    private usuarioService: UsuarioService,private authService: AuthService,){
    
  }

  ngOnInit(): void {
   this.idPersona = this.authService.decodeToken()
    this.obtenerNotas();
    
  }

  toggleMostrarNotas() {
    if(this.preguntar){
      
      this.preguntar = !this.preguntar
    }
    this.mostrarNotas = !this.mostrarNotas;
    
  }

  togglePreguntar() {
    if(this.mostrarNotas){
      this.mostrarNotas = !this.mostrarNotas;
      
    }
    this.preguntar = !this.preguntar;
    
  }


  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  obtenerNotas():void{
    this.notasService.ObtenerNotas(this.idPersona).subscribe({
      next: (response) => {
        if (response && response.length > 0) {  
          const nota = response[0]; 
          this.notasInfo = nota;
          this.contenidoNota = nota.text;
        } else {
          this.notasInfo = null;  
          this.contenidoNota = '';  
        }
      },
      error: (error) => {
        console.error('Error obtener notas', error);
      }
    });
  }
  
    
  
  guardarNota() {
    let data ={}
    if(this.notasInfo){        
      data ={
        "idNotas": this.notasInfo.idNotas,
        "idUsuario":this.notasInfo.idUsuario,
        "text":this.contenidoNota
      }    
    }else{
       data ={
        "idUsuario":this.notasInfo.idUsuario,
        "text":this.contenidoNota
      } 
    }
    
    
    this.notasService.guardarNotas(data).subscribe({
      next: (response) => {
        console.log("ruta guardada exitosamente" ,response)
      },
      error: (error) => {
        console.error('Error al guardar nota', error);
      }
    });
  }

  public hacerPregunta(){
    if (this.pregunta.trim() !== '') {  
      const data ={
        "idUsuario":this.idPersona,
        "text":this.pregunta
      } 
      this.cursosService.preguntar(data).subscribe({
        next: (response) => {
          this.respuestaPregunta = response
          this.respuestaPregunta.push(this.defaultResponse);
          this.defaultShow =true;
        },
        error: (error) => {
          console.error('Error', error);
        }
      });
      this.pregunta = ''; 
    } else {
      
      console.log('La pregunta no puede estar vacía');
    }
   
  }
  public cerrar(){
    this.togglePreguntar();
  }
}
