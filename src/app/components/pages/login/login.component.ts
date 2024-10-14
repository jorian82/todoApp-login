import {Component, inject} from '@angular/core';
import { NgClass, NgIf } from "@angular/common";
import { faFacebookF, faLinkedinIn, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { SignUpModel } from "../../../models/signup.model";
import { LoginModel } from "../../../models/login.model";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '../../../services/user.service';
import { Token } from '../../../models/user.model';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    FaIconComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  routerService = inject(Router);
  userService = inject(UserService);
  tokenService = inject(TokenStorageService);

  isLoginForm: boolean = true;
  activeForm: string = '';

  faFacebookF = faFacebookF;
  faGoogle = faGoogle;
  faLinkedinIn = faLinkedinIn;
  faXTwitter = faXTwitter;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  _toggleForm = () => {
    this.isLoginForm = !this.isLoginForm;
    this.activeForm = this.isLoginForm?'':'active';
  }

  onRegister = () => {
    const localUsers = localStorage.getItem('todoAppUsers');
    if ( localUsers != null ) {
      const users = JSON.parse(localUsers);
      users.push(this.signUpObj);
      localStorage.setItem('todoAppUsers', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('todoAppUsers', JSON.stringify(users));
    }
    alert('User registered sussessfully');
  }

  onLogin = () => {
    const localUsers = localStorage.getItem('todoAppUsers');
    if ( localUsers != null ) {
      const users = JSON.parse(localUsers);
      const user: SignUpModel = users.find( (item: SignUpModel) => item.email == this.loginObj.username && item.password == this.loginObj.password);
      if ( user != undefined ) {
        alert("Welcome back " + user.name);
        localStorage.setItem('loggedUser', JSON.stringify(user));
        this.routerService.navigateByUrl('/dashboard');
      } else {
        alert("User not found");
        this.routerService.navigateByUrl('/').then(()=>{})
      }
    }
  }

  onSignIn = () => {
    this.userService.signin(this.loginObj)
        .subscribe({
          next: (token: Token) => {
            this.tokenService.saveToken(token.accessToken);
            this.tokenService.saveUser(token);
            this.routerService.navigateByUrl('/dashboard');
          },
          error: (message: string) => {
            this.tokenService.signOut();
            alert(message);
          },
          complete: () => {
            console.info('complete');
          }
        })
  }

}
