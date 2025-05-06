import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-thematics',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './thematics.component.html',
  styleUrls: ['./thematics.component.scss']
})
export class ThematicsComponent {
  showAll = false;

  themes = [
    { icon: 'hiking', label: 'Randonnée' },
    { icon: 'brush', label: "Histoire de l’art" },
    { icon: 'diversity_3', label: 'Itinéraire famille' },
    { icon: 'sports_esports', label: 'Parcours interactifs' },
    { icon: 'map', label: 'Découverte géographique' },
    { icon: 'palette', label: 'Art et culture' },
    { icon: 'history_edu', label: 'Périodes historiques' }
  ];

  get visibleThemes() {
    return this.showAll ? this.themes : this.themes.slice(0, 4);
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }
}
