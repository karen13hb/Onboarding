import { Component } from '@angular/core';
import { NotasService } from 'src/app/services/notas.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  idPersona = 1;
  selectedTab: string = 'cursos';
  mostrarNotas: boolean = false;
  preguntar:boolean =false;
  contenidoNota: string = '';
  notasInfo: any;

  constructor(private notasService:NotasService){
    
  }

  ngOnInit(): void {
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
    debugger
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
}
