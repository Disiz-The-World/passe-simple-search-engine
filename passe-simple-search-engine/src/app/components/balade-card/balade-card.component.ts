import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balade-card',
  templateUrl: './balade-card.component.html',
  imports: [MatIcon, MatCard, MatIconButton, MatCardContent, CommonModule],
  styleUrls: ['./balade-card.component.scss'],
})
export class BaladeCardComponent {
  @Input() id!: number;
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() duration!: number;
  @Input() location!: string;
  @Input() rating: number[] = [];
  @Input() favoriteIds!: number[];
  @Input() userId!: number;
  @Output() favoriteToggled = new EventEmitter<{
    id: number;
    favoriteIds: number[];
  }>();

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/balades', this.id]);
  }
  get isFavorite(): boolean {
    return this.favoriteIds.includes(this.userId);
  }

  toggleFavorite(event: Event): void {
    event.stopPropagation();
    this.favoriteToggled.emit();
  }

  get average(): number {
    if (!this.rating || this.rating.length === 0) return 0;
    return Math.round(
      this.rating.reduce((a, b) => a + b, 0) / this.rating.length
    );
  }
}
