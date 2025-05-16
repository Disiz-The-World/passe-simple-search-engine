import { Component, Input } from '@angular/core';
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
  @Input() location!: number;
  @Input() rating: number[] = [];

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/balades', this.id]);
  }

  get durationInHours(): string {
    if (this.duration < 60) {
      return `${this.duration} min`;
    }
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    return minutes === 0 ? `${hours}h` : `${hours}h${minutes}`;
  }

  get average(): number {
    if (!this.rating || this.rating.length === 0) return 0;
    return Math.round(
      this.rating.reduce((a, b) => a + b, 0) / this.rating.length
    );
  }
}
