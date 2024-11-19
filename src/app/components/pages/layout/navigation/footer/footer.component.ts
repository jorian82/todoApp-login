import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGithubAlt, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FaIconComponent, DatePipe, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss','../../layout.component.scss']
})
export class FooterComponent {
  faGithubAlt = faGithubAlt
  faLinkedinIn= faLinkedinIn

  faCopyright = faCopyright;

  today: Date = new Date();


}
