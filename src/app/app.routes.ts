import { Routes } from '@angular/router';
import {LoginComponent} from "./components/pages/login/login.component";
import {LayoutComponent} from "./components/pages/layout/layout.component";
import {DashboardComponent} from "./components/pages/layout/common/dashboard/dashboard.component";
import { authGuard } from './helpers/auth.guard';
import { ProfileComponent } from './components/pages/layout/common/profile/profile.component';
import { AdminLayoutComponent } from './components/pages/admin/layout/admin-layout.component';
import { adminGuard } from './helpers/admin.guard';
import { UsersComponent } from './components/pages/admin/layout/users/users.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RolesComponent } from './components/pages/admin/layout/roles/roles.component';
import { TasksComponent } from './components/pages/admin/layout/tasks/tasks.component';

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
        path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]
      },
      {
        path: 'profile', component: ProfileComponent, canActivate: [authGuard]
      },
      {
        path: 'admin', component: AdminLayoutComponent, canActivate:[adminGuard], canActivateChild: [adminGuard], children: [
          {
            path: 'users', component: UsersComponent
          },
          {
            path: 'roles', component: RolesComponent
          },
          {
            path: 'tasks', component: TasksComponent
          }
        ]
      }
    ]
  },
  {
    path: 'not-found', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: 'not-found'
  }
];
