import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray,AbstractControl, Validators  } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as buffer from 'buffer';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit{

  imageUrl: any =  null;
  formulario: FormGroup;
  preguntasPersonales: any =[];
  mensajeError: string | null = null;
  imagenBase64: string  = '';
  constructor(private fb: FormBuilder,private usuarioService:UsuarioService) { 

    this.formulario = this.fb.group({
      nombre: [null, Validators.required],
      cedula: [null, Validators.required],
      usuario: [null, Validators.required],
      contra: [null, Validators.required],
      universidad: [null, Validators.required],
      carrera: [null, Validators.required],
      experienciaLaboral: this.fb.array([]),
    });  

  }

  ngOnInit(): void {
    
   setTimeout(() => {
    this.imageUrl = 'assets/img_avatar.png';
  }, 0);
    this.agregarExperiencia();
    this.obtenerPreguntasPersonal();
  }

  

  obtenerPreguntasPersonal(){
    this.usuarioService.obtenerPreguntasPersonales().subscribe({
      next: (response) => {
        this.preguntasPersonales=response.preguntas;
        this.agregarControlesPreguntas(this.preguntasPersonales)
      },
      error: (error) => {
        console.error('Error ', error);
      }
    });
  }
  agregarControlesPreguntas(preguntas:any){

    preguntas.forEach((pregunta:any) => {
      this.formulario.addControl(
        `${pregunta.idPregunta}`, 
        this.fb.control('default')
      );
    });
  }
  contruirRespuestas():any{
    const respuestasArray:any = [];
    this.preguntasPersonales.forEach((pregunta:any) => {
      
      const idRespuesta = this.formulario.controls[pregunta.idPregunta.toString()].value;

      if (idRespuesta !== 'default') {
       const data ={
          idRespuesa : parseInt(idRespuesta, 10),
          idPregunta: pregunta.idPregunta
        }
        respuestasArray.push(
          data
        );
      }
    });
    return respuestasArray
  }

  agregarExperiencia(): void {
    const experienciaLaboral = this.formulario.get('experienciaLaboral') as FormArray;
    experienciaLaboral.push(this.fb.group({
      empresa: [null],
      rol: [null]
    }));
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    if (file) {

      this.fileToBuffer(file).then(arrayBuffer => {
        const buf = buffer.Buffer.from(arrayBuffer);
        this.imagenBase64 = buf.toString('base64');
      });
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = () => {
      //   this.imagenBase64 = reader.result as string;
      //   this.imageUrl = reader.result;
      // };
    }
  
  }
  fileToBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = error => reject(error);
    });
  }


  getExperienciaLaboralControls(): AbstractControl[] {
    return (this.formulario.get('experienciaLaboral') as FormArray).controls;
  }
  
  onSubmit(): void {
    if (this.formulario.valid) {
      this.mensajeError = null;
      const usuarioData = {
        image:  this.imagenBase64,
        nombre: this.formulario.value.nombre || null,
        apellido: this.formulario.value.nombre || null,
        usuario: this.formulario.value.usuario || null,
        password: this.formulario.value.contra || null,
        universidad: this.formulario.value.universidad || null,
        carrera: this.formulario.value.carrera || null,
        cedula: this.formulario.value.cedula || null,
        correo: this.formulario.value.usuario || null,
        experiencia: this.formulario.value.experienciaLaboral.map((exp: any) => {
          return {
            empresa: exp.empresa || null,
            puesto: exp.rol || null
          };
        }),
        respuestas: this.contruirRespuestas()
      };

      this.guardarUsuario(usuarioData)

      
    
  }else{
    this.mensajeError = 'Por favor, completa todos los campos obligatorios.';
  }
  

  }

  guardarUsuario(Data:any){
    this.usuarioService.crearUsuario(Data).subscribe({
      next: (response) => {
        
      },
      error: (error) => {
        console.error('Error ', error);
      }
    });
  }
  
}
