import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input() title!: string;
  @Output() back = new EventEmitter<void>();
  @Output() toggleFavourite = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }

  onToggleFavourite() {
    this.toggleFavourite.emit();
  }
}
