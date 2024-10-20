import {Component, inject, OnDestroy} from '@angular/core';
import { NgClass, NgIf } from "@angular/common";
import { faFacebookF, faLinkedinIn, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { LoginModel } from "../../../models/login.model";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '../../../services/user.service';
import { Token } from '../../../models/user.model';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Subscription } from 'rxjs';
import { AlertComponent } from "../layout/common/alert/alert.component";
import { SignupModel } from '../../../models/signup.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    FaIconComponent,
    AlertComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {

  routerService = inject(Router);
  userService = inject(UserService);
  tokenService = inject(TokenStorageService);

  isLoginForm: boolean = true;
  activeForm: string = '';

  showAlert: boolean = false;
  alertType: string = '';
  alertContent: string = '';

  faFacebookF = faFacebookF;
  faGoogle = faGoogle;
  faLinkedinIn = faLinkedinIn;
  faXTwitter = faXTwitter;

  signUpObj: SignupModel = new SignupModel();
  loginObj: LoginModel = new LoginModel();

  onSignInSubs: Subscription = new Subscription();
  onSingUpSubs: Subscription = new Subscription();

  _toggleForm = () => {
    this.isLoginForm = !this.isLoginForm;
    this.activeForm = this.isLoginForm?'':'active';
  }

  triggerAlert = (type: string, content: string, timeout: number) => {
    this.showAlert = true;
    this.alertType = 'alert-'+type;
    this.alertContent = content;
    setTimeout(this.resetAlert, timeout);
  }

  public validateForm = (type: string) => {
    if(type === 'signin') {
      if(
            this.loginObj.username == '' || 
            this.loginObj.password == ''
      ) {
        this.triggerAlert('danger', "Missing username and/or password", 5000);
        return false;
      } 
    }else {
      if(
            this.signUpObj.email == '' || 
            this.signUpObj.name == '' || 
            this.signUpObj.password ==''
      ) {
        this.triggerAlert('danger', 'No empty fields allowed', 5000);
        return false;
      }
    }
    return true;
  }

  public onSignIn = () => {
    if(this.validateForm('signin')){
      this.onSignInSubs = this.userService.signin(this.loginObj)
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

  public onSignUp = () => {
    if(this.validateForm('signup')) {
      this.onSignInSubs = this.userService.signup(this.signUpObj)
          .subscribe({
            next: (message: string) => {
              this.triggerAlert('success', message, 5000);
              this.signUpObj = new SignupModel();
            },
            error: (error) => {
              this.triggerAlert('danger', error.error.message, 5000);
              console.log('error: ',error)
            }
          });
    }
  }

  ngOnDestroy(): void {
      this.onSingUpSubs.unsubscribe();
      this.onSignInSubs.unsubscribe();
  }

  resetAlert = () => {
    this.showAlert = false;
  }
}
