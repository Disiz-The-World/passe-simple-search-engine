import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { Router, RouterModule } from '@angular/router';
import { AvatarComponent } from '../avatar/avatar.component';
import { WalkService } from '../../services/walk.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    MatInput,
    AvatarComponent,
    MatAutocompleteModule,
    MatOptionModule,
    RouterModule,
    MatIconButton,
  ],
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent {
  @Output() burgerClick = new EventEmitter<void>();
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() searchResults = new EventEmitter<any[]>();
  searchQuery: string | undefined;
  searchMatches: any[] = [];
  isMobile = false;

  private searchChanged: Subject<string> = new Subject<string>();

  constructor(
    private walkService: WalkService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 1024;
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth <= 1024;
      });
    }

    this.searchChanged.pipe(debounceTime(300)).subscribe((query) => {
      this.performSearch(query);
    });
  }

  onBurgerClick() {
    this.burgerClick.emit();
  }

  onSearchInputChange(query: string) {
    this.searchQuery = query;
    this.searchChanged.next(query);
  }

  performSearch(query: string) {
    if (query && query.trim().length > 0) {
      this.walkService.searchWalks(query).subscribe((results: any[]) => {
        console.log('Résultats reçus :', results);
        this.searchMatches = results;
        this.searchResults.emit(results);
        this.searchQuery = '';
      });
    } else {
      this.searchMatches = [];
    }
  }

  onOptionSelected(event: any) {
    if (!isPlatformBrowser(this.platformId)) return;

    const selected = (event as MatAutocompleteSelectedEvent).option.value;
    if (selected?.id) {
      this.router.navigate(['/balades', selected.id]);
    }
  }

  onEnter() {
    if (!isPlatformBrowser(this.platformId)) return;

    const exactMatch = this.searchMatches.find(
      (w) => w.name.toLowerCase() === this.searchQuery?.toLowerCase()
    );
    if (exactMatch) {
      this.router.navigate(['/balades', exactMatch.id]);
    } else if (this.searchMatches.length === 1) {
      this.router.navigate(['/balades', this.searchMatches[0].id]);
    }
  }

  displayWalkName(walk: any): string {
    return walk?.name || '';
  }
}
