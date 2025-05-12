import { Routes } from '@angular/router';
import { DetailViewComponent } from '../components/detail-view/detail-view.component';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { ServerErrorComponent } from '../components/server-error/server-error.component';
import { TeapotComponent } from '../components/teapot/teapot.component';

export const routes: Routes = [
  { 
    path: 'balades/:id', 
    component: DetailViewComponent 
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '500',
    component: ServerErrorComponent,
  },
  {
    path: '418',
    component: TeapotComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
