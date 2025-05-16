import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { BaladeModel } from '../../../models/balade.model';
import { AuthService } from '../../../services/auth.service';
import { UserModel } from '../../../models/user.model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites-btn',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './favorites-btn.component.html',
  styleUrls: ['./favorites-btn.component.scss'], // Fixed typo: styleUrl -> styleUrls
})
export class FavoritesBtnComponent implements OnInit {
  @Input() balade: BaladeModel | undefined = undefined;
  @Output() swapEvent: EventEmitter<BaladeModel> = new EventEmitter();

  user: UserModel | undefined = undefined;
  isFavorite: boolean = false;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();

    if (this.user) {
      this.isFavorite = this.balade?.favoriteIds
        ? this.balade?.favoriteIds.includes(Number(this.user.id))
        : false;
    }
  }

  async swapFavorite(event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopPropagation();

    if (this.user === null || this.user === undefined) {
      return;
    }

    if (this.balade === null || this.balade === undefined) {
      return;
    }

    let { favoriteIds, ...balade } = this.balade;
    let userId = Number(this.user.id);

    if (favoriteIds === null || favoriteIds === undefined) {
      favoriteIds = [];
    }

    let favorites = favoriteIds.includes(userId)
      ? favoriteIds.filter((id: number) => id !== userId)
      : [...favoriteIds, Number(this.user.id)];
    const updatedData = {
      favoriteIds: favorites,
    };

    this.isFavorite = !this.isFavorite;

    try {
      await this.databaseService.updateBalade(balade.id, updatedData);
    } catch (error) {
      console.error('Failed to update balade:', error);
    }

    this.swapEvent.emit(this.balade);
  }
}
