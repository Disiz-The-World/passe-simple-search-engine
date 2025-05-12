import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

export interface SectionContent {
  type: string;
  text?: string;
  path?: string;
  legend?: string;
}

export interface Section {
  id: number;
  title: string;
  content: SectionContent[];
}

export interface Content {
  details: string;
  sections: Section[];
}

@Component({
  selector: 'app-content',
  imports: [CommonModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})

export class ContentComponent {
  @Input() content!: Content;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      console.log('Content reçu dans UsefulInfoComponent:', this.content);
    }
  }
}
