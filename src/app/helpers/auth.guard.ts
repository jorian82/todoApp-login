import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const userService = inject(UserService);
  const router = inject(Router);

  const user = tokenService.getUser();

  if(user!= null) {
    userService.verifyAccess().subscribe({
      next: (resp) => {
        // console.log('user verified: ',resp);
        return true;
      },
      error: (e) => {
        console.log("error: ",e);
        tokenService.signOut();
        router.navigateByUrl('/');
        return false;
      }
    })
  } else {
    tokenService.signOut();
    return false;
  }
  return true;
};
