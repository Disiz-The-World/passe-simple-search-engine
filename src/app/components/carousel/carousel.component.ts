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

        this.recenterTimeout = setTimeout(() => {
          this.updateFocus(true);
        }, 200);

        this.updateFocus(false);
      },
      { passive: true }
    );

    setTimeout(() => {
      this.updateFocus(true);
    }, 50);
  }

  updateFocus(recenterAfter: boolean = false): void {
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

    this.focusedIndexes = distances
      .slice(0, 2)
      .map((d) => d.index)
      .sort((a, b) => a - b);
    this.nearbyIndexes = distances.slice(2, 4).map((d) => d.index);
    this.hiddenIndexes = distances.slice(4).map((d) => d.index);

    this.cdr.detectChanges();

    if (recenterAfter) {
      this.centerFocusedCards();
    }
  }

  centerFocusedCards(): void {
    if (this.focusedIndexes.length < 2) return;

    const container = this.carouselContainer.nativeElement;
    const card1 = this.carouselCards.get(this.focusedIndexes[0])?.nativeElement;
    const card2 = this.carouselCards.get(this.focusedIndexes[1])?.nativeElement;

    if (!card1 || !card2) return;

    const center1 = card1.offsetLeft + card1.offsetWidth / 2;
    const center2 = card2.offsetLeft + card2.offsetWidth / 2;
    const averageCenter = (center1 + center2) / 2;

    const idealScrollLeft = Math.round(
      averageCenter - container.clientWidth / 2
    );
    const currentScrollLeft = container.scrollLeft;

    // ✅ Ne recentre que si décalage perceptible (> 10px)
    if (Math.abs(currentScrollLeft - idealScrollLeft) > 10) {
      this.isAutoRecentering = true;

      container.scrollTo({
        left: idealScrollLeft,
        behavior: 'smooth',
      });

      setTimeout(() => {
        this.isAutoRecentering = false;
      }, 500);
    }
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
