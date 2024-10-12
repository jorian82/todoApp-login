import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faGit, faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faHome, faTerminal, faUserTie } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, FaIconComponent, DatePipe],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  faUserTie = faUserTie;
  faHome = faHome;
  faTerminal = faTerminal;

  faGithubAlt = faGithubAlt
  faLinkedinIn= faLinkedinIn

  faCopyright = faCopyright;

  today: Date = new Date();
}
