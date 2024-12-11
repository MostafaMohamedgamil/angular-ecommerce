import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  if (token !== null) {
    console.log('Token is present:', token);
    return true;
  } else {
    console.log('Token is missing');
    router.navigate(['/login']);
    return false;
  }
};
