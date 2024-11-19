import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignupModel } from '../models/signup.model';
import { API_URL, httpOptions } from '../helpers/constants';
import { LoginModel } from '../models/login.model';
import { Token, User } from '../models/user.model';
import { map } from 'rxjs';
import { Role } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  
  public signup = (user: SignupModel) => {
    // console.log('user: ',user);
    return this.http.post<string>(
        API_URL+'auth/signup', 
        { username: user.name, email: user.email, password: user.password }, 
        httpOptions
      ).pipe(map( (resp: any) => {
        return resp?.message;
      }));
  }

  public signin = (user: LoginModel) => {
    return this.http.post<Token>(API_URL+'auth/signin', user, httpOptions);
  }

  public verifyAccess = () => {
    return this.http.get<string>(API_URL + 'user/test/user', httpOptions);
  }

  public verifyAdmin = () => {
    return this.http.get<string>(API_URL + 'user/test/admin', httpOptions);
  }

  public verifyCreator = () => {
    return this.http.get<string>(API_URL + 'user/test/mod', httpOptions);
  }

  fetchUsers() {
    let users: User[] = [];
    return this.http.get<User[]>(API_URL+'users', httpOptions)
    .pipe(
      map( response => {
        let data = JSON.parse(JSON.stringify(response)).data;
        data.forEach( (item: { roles: any[]; username: string; fullName: string; email: string; id: number; }) => {
          let roles: Role[] = [];
          item.roles.forEach( (rol:any) => roles.push(new Role(rol.name, rol.id)));
          users.push(
            new User(item.username, item.fullName, item.email, roles, item.id)
          );
        });
        return users;
      })
    );
  };
}
