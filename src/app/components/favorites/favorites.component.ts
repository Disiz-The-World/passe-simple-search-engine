import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { BaladeModel } from '../../models/balade.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatIconModule,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit, OnDestroy {
  balades: BaladeModel[] | null = [];

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    let user = this.authService.getCurrentUser();

    /*if (!user) {
      return;
    }*/

    this.databaseService.getBalades({}).subscribe((data) => {
      this.balades = data;

      /*this.balades = data.filter((balade: BaladeModel) => {
        balade.favoriteIds.includes(user.id);
      });*/
    });
  }

  swapFavorite(baladeId: number): void {
    alert('remove');
  }

  ngOnDestroy() {
    this.balades = null;
  }

  formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return duration > 60 ? `${hours}h${minutes}` : `${minutes}min`;
  }
}
