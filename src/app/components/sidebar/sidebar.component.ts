import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatLine } from '@angular/material/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    CommonModule,
    MatSidenav,
    MatNavList,
    MatIcon,
    RouterLink,
    MatSidenavContent,
    RouterOutlet,
    MatSidenavContainer,
    MatListItem,
    MatLine,
    RouterLinkActive,
  ],
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  navItems = [
    { name: 'Accueil', icon: 'home', route: '/home' },
    { name: 'Recherche', icon: 'search', route: '/about' },
    { name: 'Favoris', icon: 'bookmark', route: '/favoris' },
    { name: 'À propos', icon: 'info', route: '/about' },
  ];

  bottomItems = [
    { name: 'Mon compte', icon: 'account_circle', route: '/account' },
    { name: 'Informations légales', icon: 'event_note', route: '/legal' },
  ];
}
