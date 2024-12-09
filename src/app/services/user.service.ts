import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SignUpModel } from '../models/signUp.model';
import { API_URL, httpOptions } from '../helpers/constants';
import { LoginModel } from '../models/login.model';
import { Token, User } from '../models/user.model';
import { BehaviorSubject, map } from 'rxjs';
import { Role } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  private _isAdmin = new BehaviorSubject<boolean>(false);
  private _isCreator = new BehaviorSubject<boolean>(false);

  public $isAdmin = this._isAdmin.asObservable();
  public $isCreator = this._isCreator.asObservable();
  public $isLoggedIn = this._isLoggedIn.asObservable();

  private http = inject(HttpClient);

  public signup = (user: SignUpModel) => {
    // console.log('user: ',user);
    return this.http.post<string>(
        API_URL+'auth/signup',
        { username: user.name, email: user.email, password: user.password },
        httpOptions
      ).pipe(map( (resp: any) => {
        return resp?.message;
      }));
  }

  public setLoginState = (roles: string[]) => {
    this._isLoggedIn.next(true);
    roles.includes("ROLE_ADMIN")?this._isAdmin.next(true):roles.includes("ROLE_CREATOR")?this._isCreator.next(true):true;
  }

  public signout = () => {
    this._isLoggedIn.next(false);
    this._isCreator.next(false);
    this._isAdmin.next(false);
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

  public getUserProfile = (username: string) => {
    return this.http.get<User>(API_URL + 'user/profile/'+username, httpOptions).pipe(
      map( (response:any) => {
        let roles: Role[] = [];
        response.roles.map( (rol: string) => {
          roles.push(new Role(rol,0));
        });

        return new User(response.username, response.fullName, response.email, roles, response.id);
      })
    );
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
