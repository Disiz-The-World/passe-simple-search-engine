import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-walk-card',
  templateUrl: './featured-walk-card.component.html',
  styleUrls: ['./featured-walk-card.component.scss'],
  imports: [MatIcon, MatCard, MatCardContent, CommonModule],
})
export class FeaturedWalkCardComponent {
  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() rating!: number;
}
