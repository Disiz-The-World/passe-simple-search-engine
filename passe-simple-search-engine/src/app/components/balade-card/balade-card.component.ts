import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { WalkService } from '../../services/walk.service';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-balade-card',
  templateUrl: './balade-card.component.html',
  imports: [
    MatIcon,
    MatCard,
    MatIconButton,
    MatCardContent,
    NgForOf,
    CommonModule,
  ],
  styleUrls: ['./balade-card.component.scss'],
})
export class BaladeCardComponent implements OnInit {
  @Input() id!: number;
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() duration!: number;
  @Input() location!: number;
  @Input() ratings: number[] = [];

  walk: any;
  isGreen = true;

  constructor(
    private router: Router,
    private walkService: WalkService
  ) {}

  ngOnInit(): void {
    const needsData =
      this.duration == null || this.location == null || !this.ratings?.length;

    if (needsData) {
      this.walkService.getWalkById(this.id).subscribe((walk) => {
        this.duration ??= walk.duration;
        this.location ??= walk.location;
        this.ratings = Array.isArray(walk.ratings) ? walk.ratings : [];
        this.title ??= walk.name;
      });
    }
  }
  get rating(): number {
    if (!this.ratings || this.ratings.length === 0) return 0;
    return this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
  }
  get averageRating(): number {
    if (!Array.isArray(this.ratings) || this.ratings.length === 0) return 0;
    return this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
  }
  goToDetails() {
    this.router.navigate(['/balades', this.id]);
  }

  formatDuration(minutes: string | number): string {
    const min = Number(minutes);
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h${m > 0 ? m.toString().padStart(2, '0') : ''}`;
  }

  protected readonly Math = Math;
}
