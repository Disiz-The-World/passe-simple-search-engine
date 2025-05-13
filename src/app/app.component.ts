import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/side-bar/sidebar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    SearchBarComponent,
    AvatarComponent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    NgIf,
    SearchBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMobile = false;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.updateScreen();
      window.addEventListener('resize', this.updateScreen.bind(this));
    }
  }

  updateScreen(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 1024;
    }
  }
}
