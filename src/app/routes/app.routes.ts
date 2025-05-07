import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { HomePageComponent } from '../components/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
