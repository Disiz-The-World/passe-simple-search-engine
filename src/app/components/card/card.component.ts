import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatIcon,
    MatCardContent,
  ],
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() duration!: string;
  @Input() location!: string;
  @Input() isBookmarked = false;
  @Input() rating = 0; // entre 0 et 5
}
