import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/side-bar/sidebar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SidebarComponent,
    SearchBarComponent,
    AvatarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'passe-simple-search-engine';
}
