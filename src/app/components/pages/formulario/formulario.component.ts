import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl,AbstractControl  } from '@angular/forms';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{

  imageUrl: any =  null;
  formulario: FormGroup;

  constructor(private fb: FormBuilder) { 

    this.formulario = this.fb.group({
      nombre: [''],
      cedula: [''],
      usuario: [''],
      contra: [''],
      imageUrl: [''],
      universidad: [''],
      carrera: [''],
      experienciaLaboral: this.fb.array([]),
      tiempoLibre: [''],
      frecuenciaExperiencias: [''],
      nivelSociabilidad: ['']
    });

  }

  ngOnInit(): void {
    
   setTimeout(() => {
    this.imageUrl = 'assets/img_avatar.png';
  }, 0);
    this.agregarExperiencia();
  }

  
  agregarExperiencia(): void {
    const experienciaLaboral = this.formulario.get('experienciaLaboral') as FormArray;
    experienciaLaboral.push(this.fb.group({
      empresa: [''],
      rol: ['']
    }));
    console.log(this.formulario)
  }
  onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  getExperienciaLaboralControls(): AbstractControl[] {
    return (this.formulario.get('experienciaLaboral') as FormArray).controls;
  }
  
  onSubmit(): void {
    
  }
}
