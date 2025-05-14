import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-featured-walk-card',
  templateUrl: './featured-walk-card.component.html',
  styleUrls: ['./featured-walk-card.component.scss'],
  imports: [
    MatIcon,
    MatCard,
    MatCardContent,
    CommonModule,
    MatIconButton,
    RouterModule,
  ],
})
export class FeaturedWalkCardComponent {
  @Output() navigateToDetails = new EventEmitter<number>();
  @Input() image!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() rating!: number;
  @Input() id!: number;
  @Input() duration!: number;
  @Input() location!: number;

  constructor(private router: Router) {}
  goToDetails() {
    this.navigateToDetails.emit(this.id);
  }
}
