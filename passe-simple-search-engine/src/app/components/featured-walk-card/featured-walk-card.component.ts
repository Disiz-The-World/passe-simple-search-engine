import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-featured-walk-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './featured-walk-card.component.html',
  styleUrls: ['./featured-walk-card.component.scss'],
})
export class FeaturedWalkCardComponent implements OnInit {
  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() location!: string;
  @Input() duration!: number;
  @Input() rating: number[] = [];
  @Input() id!: number;
  @Input() favoriteIds!: number[];
  @Input() userId!: number;
  @Output() favoriteToggled = new EventEmitter<{
    id: number;
    favoriteIds: number[];
  }>();

  isMobile = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 1024;
    }
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

  goToDetails(): void {
    this.router.navigate(['/balades', this.id]);
  }
}
