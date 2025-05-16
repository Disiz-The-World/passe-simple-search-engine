import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BaladeCardComponent } from '../balade-card/balade-card.component';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { ThematicsComponent } from '../thematics/thematics.component';
import { WalkService } from '../../services/walk.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    BaladeCardComponent,
    HeroCardComponent,
    ThematicsComponent,
    CarouselComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  balades: any[] = [];
  visibleBalades: any[] = [];
  showAll = false;
  userId: number | null = null;
  constructor(
    private walkService: WalkService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().then((user) => {
      this.userId = user?.id ?? null;
    });

    const staticWalks = [
      {
        id: 2,
        favoriteIds: [2],
        image: 'assets/walk-card/emosson.jpg',
        title: 'Histoire au fil de l’eau - visite du barrage d’Emosson',
        description:
          'Perché à 1 930 mètres d’altitude, le barrage d’Emosson offre un panorama époustouflant sur le massif du Mont-Blanc.',
        rating: [1],
        duration: 90,
        location: 1930,
      },
      {
        id: 3,
        favoriteIds: [1],
        image: 'assets/walk-card/morat-see.jpg',
        title: 'Le lac de Morat : Entre nature et histoire…',
        description:
          'Le lac de Morat est un écrin de nature chargé d’histoire. Des vestiges de cités lacustres aux batailles médiévales…',
        rating: [1, 2, 3, 4, 5],
        duration: 320,
        location: 1784,
      },
      {
        id: 4,
        favoriteIds: [1],
        image: 'assets/walk-card/creux-du-van.jpg',
        title: 'Le Creux du Van : un cirque naturel à couper le souffle',
        description:
          'Le Creux du Van est un cirque naturel impressionnant, formé par l’érosion de la roche calcaire.',
        rating: [1, 2],
        duration: 205,
        location: 1805,
      },
      {
        id: 5,
        favoriteIds: [2],
        image: 'assets/walk-card/chemin-des-pionniers.jpg',
        title: 'Le chemin des Pionniers : une randonnée historique',
        description:
          'Le chemin des Pionniers est une randonnée qui retrace l’histoire des premiers habitants de la région.',
        rating: [1, 2, 3],
        duration: 120,
        location: 1768,
      },
    ];

    const repeatedWalks = Array.from({ length: 4 }).flatMap((_, i) =>
      staticWalks.map((w) => ({
        ...w,
        id: w.id * 10 + i,
        mock: true,
      }))
    );

    this.walkService.getTransformedWalks().subscribe((realWalks) => {
      this.balades = [...realWalks, ...repeatedWalks];
      this.updateVisibleBalades();
    });
  }

  onFavoriteToggled(id: number, currentFavoriteIds: number[]): void {
    if (!this.userId) return;

    const isAlreadyFav = currentFavoriteIds.includes(this.userId);
    const updatedFavorites = isAlreadyFav
      ? currentFavoriteIds.filter((uId) => uId !== this.userId)
      : [...currentFavoriteIds, this.userId];

    this.walkService
      .toggleFavorite(id, this.userId, currentFavoriteIds)
      .subscribe(() => {
        const target = this.balades.find((b) => b.id === id);
        if (target) {
          target.favoriteIds = updatedFavorites;
        }
      });
  }

  updateVisibleBalades(): void {
    const cardsPerRow =
      typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 2;
    const rowsToShow = 2;
    const maxVisible = this.showAll
      ? this.balades.length
      : cardsPerRow * rowsToShow;
    this.visibleBalades = this.balades.slice(0, maxVisible);
  }

  public toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.updateVisibleBalades();
  }
}
