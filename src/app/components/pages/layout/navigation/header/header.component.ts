import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TokenStorageService } from '../../../../../services/token-storage.service';
import { Router, RouterLink } from '@angular/router';
import { faHome, faIdCard, faRightFromBracket, faScrewdriverWrench, faTerminal, faUserTie } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FaIconComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['../../layout.component.scss', './header.component.scss']
})
export class HeaderComponent {
  tokenService = inject(TokenStorageService);
  routerService = inject(Router);

  faUserTie = faUserTie;
  faHome = faHome;
  faTerminal = faScrewdriverWrench;
  faIdCard = faIdCard;
  faRightFromBracket = faRightFromBracket;

  signout = () => {
    this.tokenService.signOut();
    this.routerService.navigateByUrl('/');
  }

}
