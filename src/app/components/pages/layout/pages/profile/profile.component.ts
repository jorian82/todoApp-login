import { buildToken } from './../../../../../models/user.model';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { User, Token, resetToken } from "../../../../../models/user.model";
import { Observable, Subscription } from "rxjs";
import { TokenStorageService } from "../../../../../services/token-storage.service";
import { UserService } from "../../../../../services/user.service";
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ NgIf, AsyncPipe, NgFor, RouterLink, RouterOutlet ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  private tokenService= inject(TokenStorageService);
  private userService = inject(UserService);
  private route = inject(Router)
  user: Token = resetToken();
  currentUser$ = new Observable<User>();
  userProfileSubs: Subscription = new Subscription();

  ngOnInit() {
    let token = this.tokenService.getUser();
    this.user = (typeof token === 'string')?JSON.parse(token):token;

    if(token){
      this.currentUser$ = this.userService.getUserProfile(this.user.username);
    }
  }

  ngOnDestroy() {
  }

  logout() {
    this.tokenService.signOut();
    this.route.navigateByUrl('/').then(()=>{});
  }
}
