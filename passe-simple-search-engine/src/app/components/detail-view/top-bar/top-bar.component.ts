import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { FavoritesBtnComponent } from '../../favorites/favorite-btn/favorites-btn.component';
import { BaladeModel } from '../../../models/balade.model';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatIconModule, FavoritesBtnComponent],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  @Input() balade!: BaladeModel | undefined;
  @Output() back = new EventEmitter<void>();
  @Output() toggleFavourite = new EventEmitter<void>();

  constructor(private location: Location) {}

  onBack() {
    this.location.back();
  }

  onToggleFavourite() {
    this.toggleFavourite.emit();
  }
}
