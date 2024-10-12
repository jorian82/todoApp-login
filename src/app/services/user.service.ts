import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignUpModel } from '../models/signup.model';
import { API_URL, httpOptions } from '../helpers/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  signup = (user: SignUpModel) => {
    return this.http.post(API_URL+'auth/signup', { username: user.name, email: user.email, password: user.password }, httpOptions);
  }

  getUsers = () => {
    return this.http.get(API_URL+'user/')
  }

  verifyAccess = () => {
    return this.http.get(API_URL + 'user/test/user', httpOptions);
  }

  verifyAdmin = () => {
    return this.http.get(API_URL + 'user/test/admin', httpOptions);
  }

  verifyCreator = () => {
    return this.http.get(API_URL + 'user/test/creator', httpOptions);
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
