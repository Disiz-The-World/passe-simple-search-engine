import { Routes } from '@angular/router';
import { DetailViewComponent } from '../components/detail-view/detail-view.component';

export const routes: Routes = [
  { path: 'balades/:id', component: DetailViewComponent }
];
