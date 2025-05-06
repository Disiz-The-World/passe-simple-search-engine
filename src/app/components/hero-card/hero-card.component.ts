import { Component } from '@angular/core';
import {
  MatCard,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  imports: [MatCard],
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent {
  imagePath: string = 'assets/hero-image.jpg';
}
