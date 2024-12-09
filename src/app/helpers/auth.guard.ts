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
      next: (resp: string) => {
        return true;
      },
      error: (e) => {
        tokenService.signOut();
        router.navigateByUrl('/').then(() => {});
        return false;
      }
    })
  } else {
    tokenService.signOut();
    router.navigateByUrl('/').then(() => {});
    return false;
  }
  return true;
};
