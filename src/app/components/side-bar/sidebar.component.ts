import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [
    CommonModule,
    MatSidenav,
    MatNavList,
    MatIcon,
    RouterLink,
    MatSidenavContainer,
    MatListItem,
    RouterLinkActive,
  ],
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
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
