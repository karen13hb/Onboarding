import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  is_LoggedIn = false; 
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

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
      this.router.navigate(['cursos']);
    }
   
  }

  onSubmit(): void {
    const credenciales ={
      correo:this.loginForm.value.email,
      password: this.loginForm.value.password

    }
    this.authService.login(credenciales).subscribe({
      next: (response) => {
        console.log(response.access_token)
        this.is_LoggedIn = true;
        this.authService.setItem('token', response);
        this.router.navigate(['cursos']);
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
