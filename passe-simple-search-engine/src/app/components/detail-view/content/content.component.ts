import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

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
  imports: [CommonModule, MatIcon],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
})
export class ContentComponent implements OnChanges {
  @Input() content!: Content;
  @Input() catchPhrase!: string;

  // Déclarez un tableau pour suivre la visibilité des sections
  contentVisibility: { name: string; visibility: boolean }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['content']) {
      console.log('Content reçu dans ContentComponent:', this.content);

      // Initialisez la visibilité des sections
      this.contentVisibility = this.content.sections.map((section) => ({
        name: section.title,
        visibility: true,
      }));
    }
  }

  toggleVisibility(sectionName: string): void {
    // Inversez la visibilité de la section correspondante
    const section = this.contentVisibility.find((s) => s.name === sectionName);
    if (section) {
      section.visibility = !section.visibility;
    }
  }

  getIcon(sectionName: string): string {
    const section = this.contentVisibility.find((s) => s.name === sectionName);
    return section?.visibility ? 'remove' : 'add';
  }

  getSectionVisibility(sectionName: string): boolean {
    const section = this.contentVisibility.find((s) => s.name === sectionName);
    return section ? section.visibility : false;
  }
}
