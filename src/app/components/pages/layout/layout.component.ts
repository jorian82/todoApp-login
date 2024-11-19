import { Component, inject } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./navigation/header/header.component";
import { FooterComponent } from "./navigation/footer/footer.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
