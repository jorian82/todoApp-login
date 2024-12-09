import { Role } from "./rol.model";

export class User {
    id: number;
    username: string;
    fullName: string;
    email: string;
    roles: Role[]

    public constructor(user: string = '', full: string = '', email: string = '', roles: Role[] = [], id: number = 0) {
      this.id = id;
      this.username = user;
      this.fullName = full;
      this.email = email;
      this.roles = roles;
    }

  }

  export interface NewUser {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles: number[];
  }

  export interface Token {
    id: number;
    username: string;
    email: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
  }

  export const resetToken = () => {
    return {id:0, username:'', email:'', roles:[], accessToken:'', refreshToken:''};
  }

  export const buildToken = (json: string): Token => {
    return JSON.parse(json);
  }
