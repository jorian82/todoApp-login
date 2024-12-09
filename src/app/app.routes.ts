import { Routes } from '@angular/router';
import {LoginComponent} from "./components/pages/login/login.component";
import {LayoutComponent} from "./components/pages/layout/layout.component";
import {DashboardComponent} from "./components/pages/layout/pages/dashboard/dashboard.component";
import { authGuard } from './helpers/auth.guard';
import { ProfileComponent } from './components/pages/layout/pages/profile/profile.component';
import { AdminLayoutComponent } from './components/pages/admin/layout/admin-layout.component';
import { adminGuard } from './helpers/admin.guard';
import { UsersComponent } from './components/pages/admin/layout/users/users.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { RolesComponent } from './components/pages/admin/layout/roles/roles.component';
import { TasksComponent } from './components/pages/admin/layout/tasks/tasks.component';
import {provideState} from "@ngrx/store";
import {userStateFeatureKey, userStateReducer} from "./states/user.reducer";
import { EditProfileComponent } from './components/pages/layout/pages/profile/edit-profile/edit-profile.component';
import { EditTaskComponent } from './components/pages/layout/pages/dashboard/edit-task/edit-task.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: LayoutComponent,
    canActivateChild: [authGuard],
    // providers: [
    //   provideState({name: userStateFeatureKey, reducer: userStateReducer})
    // ],
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'tasks', component: LayoutComponent, children: [
          {
            path: '', component: EditTaskComponent
          },
          {
            path: 'edit/:id', component: EditTaskComponent
          }
        ]
      },
      {
        path: 'profile', component: ProfileComponent
      },
      {
        path: 'profile-edit/:username', component: EditProfileComponent
      },
      {
        path: 'admin', component: AdminLayoutComponent, canActivate: [adminGuard], canActivateChild: [adminGuard], children: [
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
    path: 'not-found', component: LayoutComponent, children: [
      {
        path: '', component: NotFoundComponent
      }
    ]
  },
  {
    path: '**', redirectTo: 'not-found'
  }
];
