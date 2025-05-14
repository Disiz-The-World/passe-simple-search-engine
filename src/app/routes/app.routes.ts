import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { DetailViewComponent } from '../components/detail-view/detail-view.component';
import { ServerErrorComponent } from '../components/server-error/server-error.component';
import { TeapotComponent } from '../components/teapot/teapot.component';
import { AboutComponent } from '../components/about/about.component';
import { RechercheComponent } from '../components/recherche/recherche.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'balades/:id',
    component: DetailViewComponent,
  },
  {
    path: 'recherche',
    component: RechercheComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'favoris',
    component: FavoritesComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
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
    path: '',
    redirectTo: '/recherche',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
