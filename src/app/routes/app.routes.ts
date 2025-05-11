import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { FavoritesComponent } from '../components/favorites/favorites.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'favoris', component: FavoritesComponent },
];
