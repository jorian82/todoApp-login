import { Routes } from '@angular/router';
import {LoginComponent} from "./components/pages/login/login.component";
import {LayoutComponent} from "./components/pages/layout/layout.component";
import {DashboardComponent} from "./components/pages/dashboard/dashboard.component";

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'dashboard', component: DashboardComponent
      }
    ]
  }
];
