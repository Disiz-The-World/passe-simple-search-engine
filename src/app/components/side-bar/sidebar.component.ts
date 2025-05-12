import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

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
export class SidebarComponent implements OnInit, OnDestroy {
  navItems: any[] = [];
  bottomItems: any[] = [];

  private authSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.navItems = [
      { name: 'Accueil', icon: 'home', route: '/home' },
      { name: 'Recherche', icon: 'search', route: '/about' },
      { name: 'Favoris', icon: 'bookmark', route: '/favoris' },
      { name: 'À propos', icon: 'info', route: '/about' },
    ];

    this.updateBottomItems(this.authService.isLoggedIn());

    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => {
        this.updateBottomItems(isLoggedIn);
      }
    );
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  private updateBottomItems(isLoggedIn: boolean) {
    this.bottomItems = [
      {
        name: isLoggedIn ? 'Déconnexion' : 'Connexion',
        icon: 'account_circle',
        route: '/login',
      },
      { name: 'Informations légales', icon: 'event_note', route: '/legal' },
    ];
  }
}
