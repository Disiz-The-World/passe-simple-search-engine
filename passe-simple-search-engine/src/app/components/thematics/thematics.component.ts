import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ThematicsServices } from '../../services/thematics.services';

@Component({
  selector: 'app-thematics',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss'],
})
export class ThematicsComponent {
  showAll = false;

  themes = [
    { icon: 'hiking', label: 'Randonnée', tagId: 1 },
    { icon: 'brush', label: 'Histoire de l’art', tagId: 2 },
    { icon: 'diversity_3', label: 'Itinéraire famille', tagId: 3 },
    { icon: 'sports_esports', label: 'Parcours interactifs', tagId: 4 },
    { icon: 'map', label: 'Découverte géographique', tagId: 5 },
    { icon: 'palette', label: 'Art et culture', tagId: 6 },
    { icon: 'history_edu', label: 'Périodes historiques', tagId: 7 },
  ];

  constructor(
    private thematicsService: ThematicsServices,
    private router: Router
  ) {}

  get visibleThemes() {
    return this.showAll ? this.themes : this.themes.slice(0, 4);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  onThemeClick(tagId: number) {
    this.thematicsService.getBaladesByTag(tagId).subscribe(
      (balades) => {
        console.log('Balades associées au thème:', balades);
        this.router.navigate(['/recherche'], { queryParams: { tagId } });
      },
      (error) => {
        console.error('Erreur lors de la récupération des balades:', error);
      }
    );
  }
}
