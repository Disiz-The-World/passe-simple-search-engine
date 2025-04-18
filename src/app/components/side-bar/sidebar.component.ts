import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [CommonModule, MatIcon, RouterLink, RouterLinkActive],
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarComponent {
  navItems = [
    { name: 'Accueil', icon: 'home', route: '/home' },
    { name: 'Recherche', icon: 'search', route: '/about' },
    { name: 'Favoris', icon: 'bookmark', route: '/favoris' },
    { name: 'À propos', icon: 'article', route: '/about' },
  ];

  bottomItems = [
    { name: 'Mon compte', icon: 'account_circle', route: '/account' },
    { name: 'Informations légales', icon: 'description', route: '/legal' },
  ];
}
