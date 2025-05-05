import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/side-bar/sidebar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { CardComponent } from './components/card/card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    SearchBarComponent,
    AvatarComponent,
    CardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'passe-simple-search-engine';
}
