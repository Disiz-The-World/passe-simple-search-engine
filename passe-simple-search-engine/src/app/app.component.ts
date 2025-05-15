import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/side-bar/sidebar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { MatIconRegistry } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

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
export class AppComponent implements OnInit {
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

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'facebook',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/facebook.svg')
    );
    this.iconRegistry.addSvgIcon(
      'twitter',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/twitter.svg')
    );
  }
}
