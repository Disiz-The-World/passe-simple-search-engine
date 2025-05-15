import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tags',
  template: `
    <div class="tags">
      <div *ngFor="let tag of tags" class="tag">
        <span class="icon">
          {{ getIconChar(tag.icon) }}
        </span>
        <span class="name">{{ tag.name }}</span>
      </div>
    </div>
  `,
  styleUrls: ['./tags.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TagsComponent {
  @Input() tags: { id: number; name: string; icon: string }[] = [];

  constructor() {
    console.log('Tags', this.tags);
  }

  getIconChar(unicode: string): string {
    return String.fromCharCode(parseInt(unicode, 16));
  }
}
