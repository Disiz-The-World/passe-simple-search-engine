import {
  Component,
  Input,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  OnInit,
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
  standalone: true,
  imports: [
    MatIcon,
    MatCard,
    MatCardContent,
    CommonModule,
    MatIconButton,
    RouterModule,
  ],
})
export class FeaturedWalkCardComponent implements OnInit {
  @Output() navigateToDetails = new EventEmitter<number>();
  @Input() image!: string;
  @Input() name!: string;
  @Input() description!: string;
  @Input() ratings!: number;
  @Input() id!: number;
  @Input() duration?: number;
  @Input() location?: string;
  @Input() durationAndLocation!: string;

  isMobile = false;
  isGreen = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkMobile();

      window.addEventListener('resize', this.checkMobile);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.checkMobile);
    }
  }

  checkMobile = (): void => {
    this.isMobile = window.innerWidth < 1024;
  };

  goToDetails(): void {
    this.router.navigate(['/balades', this.id]);
  }
}
