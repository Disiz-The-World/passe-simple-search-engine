import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-walk-card',
  templateUrl: './featured-walk-card.component.html',
  styleUrls: ['./featured-walk-card.component.scss'],
  standalone: true,
  imports: [CommonModule, MatCard, MatIcon, MatCardContent, MatIconButton],
})
export class FeaturedWalkCardComponent {
  @Input() image = '';
  @Input() title = '';
  @Input() description = '';
  @Input() rating = 0;
}
