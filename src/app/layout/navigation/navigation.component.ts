import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  mostrarNotas: boolean = false;
  preguntar:boolean =false;

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
}
