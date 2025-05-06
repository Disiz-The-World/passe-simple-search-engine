import { Component } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { FeaturedWalkCardComponent } from '../featured-walk-card/featured-walk-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    HeroCardComponent,
    FeaturedWalkCardComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  walks = [
    {
      image: 'assets/walk-card/emosson.jpg',
      title: 'Histoire au fil de l’eau - visite du barrage d’Emosson',
      description:
        'Perché à 1 930 mètres d’altitude, le barrage d’Emosson offre un panorama époustouflant sur le massif du Mont-Blanc.',
      rating: 4,
    },
    {
      image: 'assets/walk-card/morat-see.jpg',
      title: 'Le lac de Morat : Entre nature et histoire…',
      description:
        'Le lac de Morat est un écrin de nature chargé d’histoire. Des vestiges de cités lacustres aux batailles médiévales…',
      rating: 3,
    },
    {
      image: 'assets/walk-card/creux-du-van.jpg',
      title: 'Le Creux du Van : un cirque naturel à couper le souffle',
      description:
        'Le Creux du Van est un cirque naturel impressionnant, formé par l’érosion de la roche calcaire.',
      rating: 5,
    },
    {
      image: 'assets/walk-card/chemin-des-pionniers.jpg',
      title: 'Le chemin des Pionniers : une randonnée historique',
      description:
        'Le chemin des Pionniers est une randonnée qui retrace l’histoire des premiers habitants de la région.',
      rating: 4,
    },
  ];
}
