import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  ElementRef,
  QueryList,
  ChangeDetectorRef,
  PLATFORM_ID,
  Inject,
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
  @ViewChildren('carouselCard', { read: ElementRef }) carouselCards!: QueryList<
    ElementRef<HTMLElement>
  >;

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.carouselContainer.nativeElement;

    el.addEventListener('scroll', () => this.updateCarouselFocus(), {
      passive: true,
    });
    this.updateCarouselFocus();
  }

  updateCarouselFocus(): void {
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
    this.cdr.detectChanges();
  }

  trackByIndex(index: number): number {
    return index;
  }
}
