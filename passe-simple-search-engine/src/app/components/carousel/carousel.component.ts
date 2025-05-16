import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedWalkCardComponent } from '../featured-walk-card/featured-walk-card.component';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, FeaturedWalkCardComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() items: any[] = [];
  @Input() userId!: number;
  @Output() favoriteToggled = new EventEmitter<{
    id: number;
    favoriteIds: number[];
  }>();
}
