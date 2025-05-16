import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tags',
  template: `
    <div class="tags">
      <div *ngFor="let tag of tags" class="tag">
        <mat-icon class="icon">{{ tag.icon }}</mat-icon>
        <span class="name">{{ tag.name }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./tags.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIcon],
})
export class TagsComponent {
  @Input() tags: { id: number; name: string; icon: string }[] = [];

  constructor() {}
}
