import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenStorageService);
  const userService = inject(UserService);
  const router = inject(Router);

  const user = tokenService.getUser();

  if(user!=null) {
    userService.verifyAdmin().subscribe(
      {
        next: (message: string) => {
          return true;
        },
        error: (err) => {
          console.log("error: ",err);
          router.navigateByUrl('/');
          return false;
        }
      }
    )
  } else {
    console.log("admin guard user: ",user);
    tokenService.signOut();
    router.navigateByUrl('/');
    return false;  
  }

  return true;

};
