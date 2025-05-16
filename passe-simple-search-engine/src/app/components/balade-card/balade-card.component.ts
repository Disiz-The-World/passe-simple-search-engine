import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { FavoritesBtnComponent } from '../favorites/favorite-btn/favorites-btn.component';
import { BaladeModel } from '../../models/balade.model';

@Component({
  selector: 'app-balade-card',
  templateUrl: './balade-card.component.html',
  imports: [MatIcon, MatCard, MatCardContent, FavoritesBtnComponent],
  styleUrls: ['./balade-card.component.scss'],
})
export class BaladeCardComponent {
  @Input() id!: number;
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() durationAndLocation!: string;
  @Input() duration!: string;
  @Input() location!: string;
  @Input() balade!: BaladeModel;

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/balades', this.id]);
  }
}
