import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SidebarComponent } from '../components/side-bar/sidebar.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
