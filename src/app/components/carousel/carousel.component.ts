import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  Output,
  EventEmitter,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  @Input() items: any[] = [];
  @Input() cardTemplate!: any;
  @Output() itemClick = new EventEmitter<any>();

  focusedIndexes: number[] = [];
  nearbyIndexes: number[] = [];
  hiddenIndexes: number[] = [];

  @ViewChild('carouselContainer', { static: false })
  carouselContainer!: ElementRef<HTMLElement>;

  @ViewChildren('carouselCard', { read: ElementRef })
  carouselCards!: QueryList<ElementRef<HTMLElement>>;

  private recenterTimeout: ReturnType<typeof setTimeout> | null = null;
  private isAutoRecentering = false;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const container = this.carouselContainer.nativeElement;

    container.addEventListener(
      'scroll',
      () => {
        if (this.isAutoRecentering) return;

        if (this.recenterTimeout) clearTimeout(this.recenterTimeout);

        // Ne recentre qu’après scroll terminé
        this.recenterTimeout = setTimeout(() => {
          this.updateFocus(true); // recentre ici
        }, 250);

        // Focus visuel uniquement, ne touche pas au scroll
        this.updateFocus(); // sans recentrage
      },
      { passive: true }
    );

    // Initial focus après chargement
    setTimeout(() => {
      this.updateFocus(true);
    }, 100);
  }

  updateFocus(recenterAfter = false): void {
    if (!this.carouselContainer || !this.carouselCards?.length) return;

    const containerRect =
      this.carouselContainer.nativeElement.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;

    const distances = this.carouselCards.map((cardRef, index) => {
      const rect = cardRef.nativeElement.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      return { index, distance: Math.abs(centerX - cardCenter) };
    });

    distances.sort((a, b) => a.distance - b.distance);

    // ✅ Sur mobile : un seul focus, pas de nearby
    const isMobile = window.innerWidth <= 1024;
    this.focusedIndexes = distances
      .slice(0, isMobile ? 1 : 2)
      .map((d) => d.index);
    this.nearbyIndexes = isMobile
      ? []
      : distances.slice(2, 4).map((d) => d.index);
    this.hiddenIndexes = isMobile
      ? this.carouselCards
          .map((_, i) => i)
          .filter((i) => !this.focusedIndexes.includes(i))
      : distances.slice(4).map((d) => d.index);

    this.cdr.detectChanges();
  }

  centerFocusedCards(): void {
    if (this.focusedIndexes.length < 2) return;

    const container = this.carouselContainer.nativeElement;
    const card1 = this.carouselCards.get(this.focusedIndexes[0])?.nativeElement;
    const card2 = this.carouselCards.get(this.focusedIndexes[1])?.nativeElement;

    if (!card1 || !card2) return;

    const card1Rect = card1.getBoundingClientRect();
    const card2Rect = card2.getBoundingClientRect();

    const containerRect = container.getBoundingClientRect();

    const card1Center = card1.offsetLeft + card1.offsetWidth / 2;
    const card2Center = card2.offsetLeft + card2.offsetWidth / 2;

    const averageCardCenter = (card1Center + card2Center) / 2;
    const desiredScrollLeft = averageCardCenter - container.clientWidth / 2;

    container.scrollTo({
      left: desiredScrollLeft,
      behavior: 'smooth',
    });
  }

  getClasses(i: number): string {
    if (this.focusedIndexes.includes(i)) {
      if (i === this.focusedIndexes[0]) return 'focused focused-left';
      if (i === this.focusedIndexes[1]) return 'focused focused-right';
      return 'focused';
    }
    if (this.nearbyIndexes.includes(i)) return 'nearby';
    if (this.hiddenIndexes.includes(i)) return 'hidden';
    return '';
  }

  trackByIndex(index: number): number {
    return index;
  }
}
