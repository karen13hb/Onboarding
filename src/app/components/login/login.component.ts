import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  is_LoggedIn = false; 
  constructor(private formBuilder: FormBuilder,private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.isLoggedIn()
  }

  isLoggedIn(): void {
    if (this.authService.isLoggedIn()) {
      this.is_LoggedIn = true;
     
    }
   
  }

  onSubmit(): void {
    const credenciales ={
      correo:this.loginForm.value.email,
      password: this.loginForm.value.password

    }
    this.authService.login(credenciales).subscribe({
      next: (response) => {
        console.log(response)
        this.is_LoggedIn = true;
        // this.authService.setItem('token', response);
      },
      error: (error) => {
        console.error('Login failed:', error);

        // if (error instanceof HttpErrorResponse && error.status === 401) {
        //   this.errorMessage = 'Credenciales inválidas. Por favor, verifica tus datos.';
        // } else {
        //   this.errorMessage = 'Ha ocurrido un error. Por favor, intenta nuevamente más tarde.';
        // }
      }
    });
    
  }

}
