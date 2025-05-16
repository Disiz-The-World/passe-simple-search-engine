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
import { FavoritesBtnComponent } from './favorite-btn/favorites-btn.component';

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
    FavoritesBtnComponent,
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'], // Fixed typo: styleUrl -> styleUrls
})
export class FavoritesComponent implements OnInit, OnDestroy {
  balades: BaladeModel[] | null = [];
  user: UserModel | undefined = undefined;
  selectedSort: string = 'asc';
  isLoading: boolean = true;

  constructor(
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.user = await this.authService.getCurrentUser();
    this.loadBalades();
    this.isLoading = false;
  }

  private async loadBalades() {
    if (!this.user) {
      return;
    }

    let balades = await this.databaseService.getBalades({});

    this.balades = await Promise.all(
      balades
        .filter((balade: BaladeModel) => {
          return this.user && balade.favoriteIds.includes(Number(this.user.id));
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

    if (balades.length > 0) {
      this.sortBalades('asc');
    }
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
    const minutes = duration % 60 < 10 ? `0${duration % 60}` : duration % 60;

    return duration > 60 ? `${hours}h${minutes}` : `${minutes}min`;
  }

  removeFromList(balade: BaladeModel): void {
    if (!this.balades) {
      return;
    }

    this.balades = this.balades.filter(
      (item: BaladeModel) => item.id !== balade.id
    );
  }
}
