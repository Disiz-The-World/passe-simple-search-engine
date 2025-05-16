import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
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
  ratings: number[];
  map?: string;
  infos?: any[];
  favoriteIds?: number[];
  content?: any;
  attributions?: any;
  seeMore?: string[];
}

export interface Tag {
  id: number;
  name: string;
  icon: string;
  category: 'terrain' | 'period' | 'criteria';
}

export interface FilterTag {
  id: number;
  name: string;
  icon: string;
  category: string;
  selected: boolean;
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
    MatSliderModule,
  ],
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss'],
})
export class RechercheComponent implements OnInit {
  titleSearch: string = '';
  locationSearch: string = '';
  durationMin: number = 1;
  durationMax: number = 12;

  terrainTypes: FilterTag[] = [];
  historicalPeriods: FilterTag[] = [];
  criteria: FilterTag[] = [];

  balades: Balade[] = [];
  filteredBalades: Balade[] = [];

  terrainExpanded: boolean = false;
  historicalPeriodsExpanded: boolean = false;
  criteriaExpanded: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<Tag[]>('http://localhost:3000/tags').subscribe({
      next: (tags) => {
        this.initializeFilterArrays(tags);
        this.loadBalades();
      },
      error: (err) => console.error('Error loading tags:', err),
    });
  }

  loadBalades() {
    this.http.get<Balade[]>('http://localhost:3000/balades').subscribe({
      next: (baladesData) => {
        this.balades = baladesData;
        this.search();
      },
      error: (err) => console.error('Error loading balades:', err),
    });
  }

  initializeFilterArrays(backendTags: Tag[]) {
    this.terrainTypes = backendTags
      .filter((tag) => tag.category === 'terrain')
      .map((tag) => ({
        id: tag.id,
        name: tag.name,
        icon: tag.icon,
        category: tag.category,
        selected: false,
      }));

    this.historicalPeriods = backendTags
      .filter((tag) => tag.category === 'period')
      .map((tag) => ({
        id: tag.id,
        name: tag.name,
        icon: tag.icon,
        category: tag.category,
        selected: false,
      }));

    this.criteria = backendTags
      .filter((tag) => tag.category === 'criteria')
      .map((tag) => ({
        id: tag.id,
        name: tag.name,
        icon: tag.icon,
        category: tag.category,
        selected: false,
      }));
  }

  search() {
    this.filteredBalades = this.balades.filter((balade) => {
      const matchesTitle =
        !this.titleSearch ||
        balade.name.toLowerCase().includes(this.titleSearch.toLowerCase()) ||
        balade.catchPhrase
          .toLowerCase()
          .includes(this.titleSearch.toLowerCase());

      const matchesLocation =
        !this.locationSearch ||
        balade.location
          .toString()
          .toLowerCase()
          .includes(this.locationSearch.toLowerCase());

      const durationHours = balade.duration / 60;
      const matchesDuration =
        durationHours >= this.durationMin && durationHours <= this.durationMax;

      const selectedTagIds = this.getSelectedTagIds();
      const matchesTags =
        selectedTagIds.length === 0 ||
        (balade.tagIds &&
          selectedTagIds.every((tagId) => balade.tagIds.includes(tagId)));

      return matchesTitle && matchesLocation && matchesDuration && matchesTags;
    });
  }

  getSelectedTagIds(): number[] {
    return [...this.terrainTypes, ...this.historicalPeriods, ...this.criteria]
      .filter((filter) => filter.selected)
      .map((filter) => filter.id);
  }

  toggleFilter(filter: FilterTag) {
    filter.selected = !filter.selected;
    this.search();
  }

  getActiveFilters(): FilterTag[] {
    return [
      ...this.terrainTypes,
      ...this.historicalPeriods,
      ...this.criteria,
    ].filter((filter) => filter.selected);
  }

  removeActiveFilter(filterToRemove: FilterTag) {
    const allFilterArrays = [
      this.terrainTypes,
      this.historicalPeriods,
      this.criteria,
    ];
    for (const filterArray of allFilterArrays) {
      const filterInArray = filterArray.find((f) => f.id === filterToRemove.id);
      if (filterInArray) {
        filterInArray.selected = false;
        break;
      }
    }
    this.search();
  }

  clearAllFilters() {
    [...this.terrainTypes, ...this.historicalPeriods, ...this.criteria].forEach(
      (filter) => (filter.selected = false)
    );
    this.search();
  }

  clearTitleSearch() {
    this.titleSearch = '';
    this.search();
  }

  clearLocationSearch() {
    this.locationSearch = '';
    this.search();
  }

  formatDuration(durationInMinutes: number): string {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return minutes > 0 ? `${hours}h${minutes}` : `${hours}h`;
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/balades', id]);
  }

  onDurationChange() {
    if (this.durationMin > this.durationMax) {
      this.durationMax = this.durationMin;
    }
    this.search();
  }

  onSearchInput() {
    this.search();
  }

  onLocationInput() {
    this.search();
  }

  getAverageRating(balade: Balade): string {
    const ratings = balade.ratings;
    if (!ratings || ratings.length === 0) return '0.0';
    const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
    return avg.toFixed(1);
  }

  toggleTerrainExpansion() {
    this.terrainExpanded = !this.terrainExpanded;
  }

  toggleHistoricalPeriodsExpansion() {
    this.historicalPeriodsExpanded = !this.historicalPeriodsExpanded;
  }

  toggleCriteriaExpansion() {
    this.criteriaExpanded = !this.criteriaExpanded;
  }

  getExpansionIcon(expanded: boolean): string {
    return expanded ? 'remove' : 'add';
  }
}
