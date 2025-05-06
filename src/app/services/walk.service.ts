import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WalkService {
  constructor() {}
  getWalks() {
    return [
      {
        imageUrl: 'assets/images/walk1.jpg',
        title: 'Promenade au bord de la mer',
        duration: '2 heures',
        location: 'Plage de Nice',
        isBookmarked: false,
        rating: 4.5,
      },
      {
        imageUrl: 'assets/images/walk2.jpg',
        title: 'Randonnée en montagne',
        duration: '5 heures',
        location: 'Parc national des Écrins',
        isBookmarked: true,
        rating: 4.8,
      },
      {
        imageUrl: 'assets/images/walk3.jpg',
        title: 'Visite de la vieille ville',
        duration: '3 heures',
        location: 'Vieille ville de Genève',
        isBookmarked: false,
        rating: 4.2,
      },
      {
        imageUrl: 'assets/images/walk4.jpg',
        title: 'Découverte des vignobles',
        duration: '4 heures',
        location: 'Vignobles de Lavaux',
        isBookmarked: true,
        rating: 4.7,
      },
      {
        imageUrl: 'assets/images/walk5.jpg',
        title: 'Balade en forêt',
        duration: '1 heure',
        location: 'Forêt de Fontainebleau',
        isBookmarked: false,
        rating: 4.0,
      },
    ];
  }
}
