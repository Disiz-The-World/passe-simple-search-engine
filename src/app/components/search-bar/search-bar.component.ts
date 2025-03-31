import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatAutocomplete, MatOption } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    CommonModule,
    MatAutocomplete,
    FormsModule,
    MatInput,
  ],
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  searchQuery: string | undefined;
}
