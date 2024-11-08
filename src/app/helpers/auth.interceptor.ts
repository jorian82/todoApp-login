import { HTTP_INTERCEPTORS, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenStorageService);
  const token = tokenService.getToken();
  const TOKEN_HEADER_KEY = 'x-access-token';
  
  let authReq = req;

  if(token!=null) {
    authReq = req.clone(
      {
        headers: req.headers.set(TOKEN_HEADER_KEY, token)
      }
    );
  }

  return next(authReq);
};

// export const authInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, use}
// ]
