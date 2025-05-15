import { Component } from '@angular/core';
import { MatCard, MatCardImage } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  imports: [MatCard, MatCardImage],
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent {
  imagePath: string = 'assets/hero-image.jpg';

  constructor(private router: Router) {}
  onCardClick() {
    this.router.navigate(['/about']);
  }
}
