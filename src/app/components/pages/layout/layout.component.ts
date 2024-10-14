import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faHome, faTerminal, faUserTie, faRightFromBracket, faIdCard } from '@fortawesome/free-solid-svg-icons'
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, FaIconComponent, DatePipe, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  tokenService = inject(TokenStorageService);
  routerService = inject(Router);

  faUserTie = faUserTie;
  faHome = faHome;
  faTerminal = faTerminal;
  faIdCard = faIdCard;
  faRightFromBracket = faRightFromBracket;

  faGithubAlt = faGithubAlt
  faLinkedinIn= faLinkedinIn

  faCopyright = faCopyright;

  today: Date = new Date();

  signout = () => {
    this.tokenService.signOut();
    this.routerService.navigateByUrl('/');
  }
}
