import { Component } from '@angular/core';
import { NgClass, NgIf } from "@angular/common";
import { faFacebookF, faLinkedinIn, faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { SignUpModel } from "../../../models/SignUp.model";
import { LoginModel } from "../../../models/Login.model";
import { FormsModule } from "@angular/forms";

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

  isLoginForm: boolean = true;
  activeForm: string = 'go-register';

  faFacebookF = faFacebookF;
  faGooglePlusG = faGooglePlusG;
  faLinkedinIn = faLinkedinIn;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  _toggleForm = () => {
    this.isLoginForm = !this.isLoginForm;
    this.activeForm = this.isLoginForm?'go-register':'go-login';
  }

  onRegister = () => {
    const localUser = localStorage.getItem('todoAppUsers');
    if ( localUser != null ) {
      const users = JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('todoAppUsers', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('todoAppUsers', JSON.stringify(users));
    }
  }

  onLogin = () => {
    const localUser = localStorage.getItem('todoAppUsers');
    let isRegistered = false;
    if ( localUser != null ) {
      const users = JSON.parse(localUser);
      const user = users.filter( (item: SignUpModel) => item.email == this.loginObj.username );
      if ( user.length > 0 ) {
        isRegistered = user[0].password == this.loginObj.password;
      }
    }

    if (isRegistered) {

    }
  }

}
