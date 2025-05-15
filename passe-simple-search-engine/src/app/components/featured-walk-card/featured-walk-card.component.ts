import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  @Input() duration?: number;
  @Input() location?: number;
  @Input() durationAndLocation!: string;

  isMobile = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 1024;
    }
  }

  goToDetails(): void {
    this.router.navigate(['/balades', this.id]);
  }
}
