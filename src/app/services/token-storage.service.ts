import { getFullState } from './../states/user.selector';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { resetToken, Token } from "../models/user.model";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private _token = new BehaviorSubject<string>('');
  private _user = new BehaviorSubject<Token>(resetToken());

  $currentUser = this._user.asObservable();

  public signOut = () => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.clear();
    this._user.next(resetToken());
    this._token.next('');
  }

  public saveToken = (token: string) => {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this._token.next(token);
  }

  public getToken = () => {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser = (user: Token) => {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    this._user.next(user);
  }

  public getUser = () => {
    let user = this._user.getValue();

    if (user.username!='') {
      return user;
    } else {
      // let user = window.sessionStorage.getItem(USER_KEY);
      // user?this._user.next(JSON.parse(JSON.stringify(user))):null;
      return window.sessionStorage.getItem(USER_KEY);
    }
  }

}
