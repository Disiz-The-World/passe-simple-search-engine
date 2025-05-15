import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BaladeCardComponent } from '../balade-card/balade-card.component';
import { FeaturedWalkCardComponent } from '../featured-walk-card/featured-walk-card.component';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { ThematicsComponent } from '../thematics/thematics.component';
import { WalkService } from '../../services/walk.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    BaladeCardComponent,
    CommonModule,
    FeaturedWalkCardComponent,
    HeroCardComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    ThematicsComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  balades: any[] = [];
  visibleBalades: any[] = [];
  showAll = false;

  focusedIndexes: number[] = [];
  nearbyIndexes: number[] = [];
  hiddenIndexes: number[] = [];

  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  @ViewChild('carouselContainer', { static: false })
  carouselContainer!: ElementRef<HTMLElement>;

  @ViewChildren('carouselCard', { read: ElementRef })
  carouselCards!: QueryList<ElementRef<HTMLElement>>;

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleBalades();
  }

  constructor(
    private walkService: WalkService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    const staticWalks = [
      {
        id: 2,
        image: 'assets/walk-card/emosson.jpg',
        title: 'Histoire au fil de l’eau - visite du barrage d’Emosson',
        description:
          'Perché à 1 930 mètres d’altitude, le barrage d’Emosson offre un panorama époustouflant sur le massif du Mont-Blanc.',
        rating: 2,
        duration: 2,
      },
      {
        id: 3,
        image: 'assets/walk-card/morat-see.jpg',
        title: 'Le lac de Morat : Entre nature et histoire…',
        description:
          'Le lac de Morat est un écrin de nature chargé d’histoire. Des vestiges de cités lacustres aux batailles médiévales…',
        rating: 3,
        duration: 3,
      },
      {
        id: 4,
        image: 'assets/walk-card/creux-du-van.jpg',
        title: 'Le Creux du Van : un cirque naturel à couper le souffle',
        description:
          'Le Creux du Van est un cirque naturel impressionnant, formé par l’érosion de la roche calcaire.',
        rating: 1,
        duration: 1,
      },
      {
        id: 5,
        image: 'assets/walk-card/chemin-des-pionniers.jpg',
        title: 'Le chemin des Pionniers : une randonnée historique',
        description:
          'Le chemin des Pionniers est une randonnée qui retrace l’histoire des premiers habitants de la région.',
        rating: 2,
        duration: 2,
      },
    ];
    const repeatedWalks = Array.from({ length: 4 }).flatMap((_, i) =>
      staticWalks.map((w) => ({
        ...w,
        id: w.id * 10 + i,
        mock: true,
      }))
    );

    this.walkService.getTransformedWalks().subscribe((realWalks) => {
      this.balades = [...realWalks, ...repeatedWalks];
      this.updateVisibleBalades();
    });
  }

  private scrollStopTimeout: ReturnType<typeof setTimeout> | null = null;
  onScroll(): void {
    this.updateCarouselFocus();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.carouselContainer.nativeElement;

    el.addEventListener('scroll', () => this.onScroll(), { passive: true });
    el.addEventListener('mousedown', this.onMouseDown.bind(this));
    el.addEventListener('mouseup', this.onMouseUp.bind(this));
    el.addEventListener('mousemove', this.onMouseMove.bind(this));
    el.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    el.addEventListener('wheel', this.onMouseWheel.bind(this), {
      passive: false,
    });

    this.updateCarouselFocus();
  }
  onMouseDown(e: MouseEvent): void {
    e.preventDefault();
    this.isDragging = true;
    this.carouselContainer.nativeElement.classList.add('dragging');
    this.startX = e.pageX - this.carouselContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.carouselContainer.nativeElement.scrollLeft;
  }

  onMouseLeave(): void {
    this.isDragging = false;
    this.carouselContainer.nativeElement.classList.remove('dragging');
  }

  onMouseUp(): void {
    this.isDragging = false;
    this.carouselContainer.nativeElement.classList.remove('dragging');
  }

  onMouseMove(e: MouseEvent): void {
    if (!this.isDragging || e.buttons === 0) {
      this.onMouseUp();
      return;
    }

    e.preventDefault();
    const x = e.pageX - this.carouselContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 0.01;
    this.carouselContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
  onMouseWheel(e: WheelEvent): void {
    if (!e.shiftKey && Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
      return;
    }

    e.preventDefault();

    const scrollAmount = e.deltaY || e.deltaX;
    this.carouselContainer.nativeElement.scrollLeft += scrollAmount * 0.9;
  }

  onNavigateToDetails(id: number) {
    this.router.navigate(['/balades', id]);
  }

  public toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.updateVisibleBalades();
  }

  get displayedBalades(): any[] {
    return [...this.balades, ...this.balades, ...this.balades, ...this.balades];
  }

  updateVisibleBalades(): void {
    const cardsPerRow =
      typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 2;
    const rowsToShow = 2;
    const maxVisible = this.showAll
      ? this.balades.length
      : cardsPerRow * rowsToShow;
    this.visibleBalades = this.balades.slice(0, maxVisible);
  }

  private lastFocusedIndex: number | null = null;
  updateCarouselFocus(): void {
    if (!this.carouselContainer?.nativeElement || !this.carouselCards) return;

    const containerRect =
      this.carouselContainer.nativeElement.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    const distances = this.carouselCards.map((cardRef, index) => {
      const cardRect = cardRef.nativeElement.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      return { index, distance: Math.abs(centerX - cardCenter) };
    });

    distances.sort((a, b) => a.distance - b.distance);

    this.focusedIndexes = distances.slice(0, 2).map((d) => d.index);
    this.nearbyIndexes = distances.slice(2, 3).map((d) => d.index);
    this.hiddenIndexes = distances.slice(3).map((d) => d.index);
    this.lastFocusedIndex = this.focusedIndexes[0];
    this.cdr.detectChanges();
  }

  centerFocusedCard(): void {
    if (
      this.focusedIndexes.length < 2 ||
      !this.carouselCards ||
      !this.carouselCards.get(this.focusedIndexes[0]) ||
      !this.carouselCards.get(this.focusedIndexes[1])
    ) {
      return;
    }

    const cardEl1 = this.carouselCards.get(
      this.focusedIndexes[0]
    )!.nativeElement;
    const cardEl2 = this.carouselCards.get(
      this.focusedIndexes[1]
    )!.nativeElement;
    const containerEl = this.carouselContainer.nativeElement;

    const center1 = cardEl1.offsetLeft + cardEl1.offsetWidth / 2;
    const center2 = cardEl2.offsetLeft + cardEl2.offsetWidth / 2;
    const averageCenter = (center1 + center2) / 2;

    const containerCenter =
      containerEl.scrollLeft + containerEl.clientWidth / 2;
    const scrollDiff = averageCenter - containerCenter;

    containerEl.scrollTo({
      left: containerEl.scrollLeft + scrollDiff,
      behavior: 'smooth',
    });
  }

  trackByBalade(index: number, item: any): number {
    return item.id;
  }
  getDurationAndLocation(walk: any): string {
    const duration = walk.duration ? `${walk.duration}h` : '';
    const location = walk.location ? walk.location : '';
    if (duration && location) {
      return `${duration} · ${location}`;
    }
    return duration || location || '';
  }
}
