import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';

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
  ],
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SearchBarComponent {
  @Output() burgerClick = new EventEmitter<void>();
  @Output() closeDrawer = new EventEmitter<void>();
  searchQuery: string | undefined;
  isMobile = false;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 1024;
      window.addEventListener('resize', () => {
        this.isMobile = window.innerWidth <= 1024;
      });
    }
  }

  onBurgerClick() {
    this.burgerClick.emit();
  }
}
