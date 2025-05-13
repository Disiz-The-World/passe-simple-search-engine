import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Balade {
  id: number;
  name: string;
  catchPhrase: string;
  duration: number;
  location: number;
  previewPath: string;
  tagIds: number[];
}

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
  ],
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
  // Search form values
  locationSearch: string = '';
  placeSearch: string = '';
  duration: { min: number; max: number } = { min: 2, max: 8 };

  // Filter options
  terrainTypes = [
    { label: 'Moyen-âge', value: 'moyen-age', checked: true },
    {
      label: 'Époque contemporaine',
      value: 'epoque-contemporaine',
      checked: true,
    },
    { label: 'Renaissance', value: 'renaissance', checked: false },
    { label: 'Époque moderne', value: 'epoque-moderne', checked: false },
  ];

  historicalPeriods = [
    { label: 'Préhistoire', value: 'prehistoire', checked: false },
    { label: 'Antiquité', value: 'antiquite', checked: false },
    { label: 'Moyen-Âge', value: 'moyen-age', checked: false },
    { label: 'Époque moderne', value: 'epoque-moderne', checked: false },
  ];

  criteria = [
    { label: 'Accessible PMR', value: 'pmr', checked: false },
    { label: 'Transport public', value: 'transport', checked: false },
    { label: 'Restauration', value: 'restauration', checked: false },
    { label: 'Parking gratuit', value: 'parking', checked: false },
  ];

  // Data
  balades: Balade[] = [];
  filteredBalades: Balade[] = [];
  tags: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Load balades
    this.http.get<Balade[]>('http://localhost:3000/balades').subscribe({
      next: (balades) => {
        this.balades = balades;
        this.filteredBalades = balades;
      },
      error: (err) => console.error('Error loading balades:', err),
    });

    // Load tags
    this.http.get<any[]>('http://localhost:3000/tags').subscribe({
      next: (tags) => {
        this.tags = tags;
      },
      error: (err) => console.error('Error loading tags:', err),
    });
  }

  search() {
    this.filteredBalades = this.balades.filter((balade) => {
      // Filter by search terms
      const matchesLocation =
        !this.locationSearch ||
        balade.name.toLowerCase().includes(this.locationSearch.toLowerCase()) ||
        balade.catchPhrase
          .toLowerCase()
          .includes(this.locationSearch.toLowerCase());

      const matchesPlace =
        !this.placeSearch ||
        balade.location.toString().includes(this.placeSearch);

      // Filter by duration
      const durationHours = balade.duration / 60;
      const matchesDuration =
        durationHours >= this.duration.min &&
        durationHours <= this.duration.max;

      return matchesLocation && matchesPlace && matchesDuration;
    });
  }

  removeFilter(type: string, value: string) {
    switch (type) {
      case 'terrain':
        const terrainFilter = this.terrainTypes.find((t) => t.value === value);
        if (terrainFilter) terrainFilter.checked = false;
        break;
      case 'period':
        const periodFilter = this.historicalPeriods.find(
          (p) => p.value === value
        );
        if (periodFilter) periodFilter.checked = false;
        break;
      case 'criteria':
        const criteriaFilter = this.criteria.find((c) => c.value === value);
        if (criteriaFilter) criteriaFilter.checked = false;
        break;
    }
    this.search();
  }

  getActiveFilters() {
    const filters: { type: string; value: string; label: string }[] = [];

    this.terrainTypes
      .filter((t) => t.checked)
      .forEach((t) =>
        filters.push({ type: 'terrain', value: t.value, label: t.label })
      );

    this.historicalPeriods
      .filter((p) => p.checked)
      .forEach((p) =>
        filters.push({ type: 'period', value: p.value, label: p.label })
      );

    this.criteria
      .filter((c) => c.checked)
      .forEach((c) =>
        filters.push({ type: 'criteria', value: c.value, label: c.label })
      );

    return filters;
  }

  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return minutes > 0
      ? `${hours}h${String(minutes).padStart(2, '0')}`
      : `${hours}h00`;
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/balades', id]);
  }

  onDurationChange() {
    this.search();
  }

  onFilterChange() {
    this.search();
  }
}
