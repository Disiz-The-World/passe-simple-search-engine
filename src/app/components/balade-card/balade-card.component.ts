import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-balade-card',
  templateUrl: './balade-card.component.html',
  imports: [MatIcon, MatCard, MatIconButton, MatCardContent],
  styleUrls: ['./balade-card.component.scss'],
})
export class BaladeCardComponent {
  @Input() id!: number;
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() duration!: number;
  @Input() location!: number;

  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/balades', this.id]);
  }
}
