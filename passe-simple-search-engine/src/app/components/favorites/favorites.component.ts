import { MatSelectModule } from '@angular/material/select';
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
import { UserModel } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { MatOption } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { TagsComponent } from '../tags/tags.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
    MatIconModule,
    RouterLink,
    FormsModule,
    MatOption,
    MatSelectModule,
    TagsComponent,
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'], // Fixed typo: styleUrl -> styleUrls
})
export class FavoritesComponent implements OnInit, OnDestroy {
  balades: BaladeModel[] | null = [];
  user: UserModel | null = null;
  selectedSort: string = 'asc';
  isLoading: boolean = true;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    let user = await this.authService.getCurrentUser();

    if (!user) {
      return;
    }

    let balades = await this.databaseService.getBalades({});

    if (balades.length > 0) {
      this.balades = await Promise.all(
        balades
          .filter((balade: BaladeModel) => {
            return balade.favoriteIds.includes(Number(user.id));
          })
          .map(async (balade: BaladeModel) => {
            const tags = await Promise.all(
              balade.tagIds.map((tagId: number) =>
                this.databaseService.getTags({ id: tagId })
              )
            );
            return {
              ...balade,
              tags: tags.flat(),
            };
          })
      );

      this.isLoading = false;
    }
  }

  swapFavorite(baladeId: number): void {
    if (this.user == null || this.user == undefined) {
      return;
    }

    this.databaseService.getBalades({ id: baladeId }).then(async (data) => {
      const { favoriteIds, ...balade } = data[0];
      const user = await this.authService.getCurrentUser();

      if (!balade || !user) {
        return;
      }

      let favorites = favoriteIds.includes(user.id)
        ? favoriteIds.filter((id: number) => id !== user.id)
        : [...favoriteIds, user.id];

      const updatedData = {
        ...balade,
        favoriteIds: favorites,
      };

      console.log('updatedData', updatedData);
      return;

      this.databaseService.updateBalade(baladeId, updatedData);
    });
  }

  sortBalades(sort: string): void {
    if (!this.balades) {
      return;
    }

    this.balades = this.balades
      ? this.balades.sort((a, b) => {
          if (sort === 'asc') {
            return a.name.localeCompare(b.name);
          }
          if (sort === 'desc') {
            return b.name.localeCompare(a.name);
          }
          return 0;
        })
      : null;
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
