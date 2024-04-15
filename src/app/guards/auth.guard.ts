import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['']);  // Redirige a la página de inicio de sesión si no está autenticado
    return false;
  }
}
  
