import {Component, inject, OnDestroy} from '@angular/core';
import { NgClass, NgIf } from "@angular/common";
import { faFacebookF, faLinkedinIn, faGoogle, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { SignupModel } from "../../../models/signup.model";
import { LoginModel } from "../../../models/login.model";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from '../../../services/user.service';
import { Token } from '../../../models/user.model';
import { TokenStorageService } from '../../../services/token-storage.service';
import { Subscription } from 'rxjs';
import { AlertComponent } from "../layout/common/alert/alert.component";

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

  public onSignIn = () => {
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

  public onSignUp = () => {
    this.onSignInSubs = this.userService.signup(this.signUpObj)
        .subscribe({
          next: (message: string) => {
            this.showAlert = true;
            this.alertType = 'alert-success';
            this.alertContent = message;
            setTimeout(this.resetAlert, 5000);
          },
          error: (error) => {
            this.showAlert = true;
            this.alertType = 'alert-danger';
            this.alertContent = error.error.message;
            // alert(error.error.message); 
            console.log('error: ',error)
            setTimeout(this.resetAlert, 5000);
          }
        });
  }

  ngOnDestroy(): void {
      this.onSingUpSubs.unsubscribe();
      this.onSignInSubs.unsubscribe();
  }

  resetAlert = () => {
    this.showAlert = false;
  }
}
