import { HttpHeaders } from "@angular/common/http";

// export const API_URL = '/api/';
// export const API_URL = 'https://documents-manager-346303.rj.r.appspot.com/api/';
// export const API_URL = 'http://host53-145.viabrs.com.br:8080/api/';
export const API_URL = 'http://localhost:8080/api/';

export const httpOptions = {
    headers: new HttpHeaders( {'Content-Type':'application/json'})
  }