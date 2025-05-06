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
      // Ajoutez d'autres promenades ici
    ];
  }
}
