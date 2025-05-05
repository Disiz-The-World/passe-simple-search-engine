import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-information',
  imports: [CommonModule],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
  standalone: true,
})
export class InformationComponent implements OnChanges {
  @Input() infos!: { icon: string; name: string; description: string }[];
  @Input() map!: string;
  @Input() attributions!: {
    Illustrations: string;
    Textes: string;
    Images: string;
  };
  @Input() seeMore!: string[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['infos']) {
      console.log('Infos reçues dans info', this.infos);
    }
    if (changes['attributions']) {
      console.log('Attributions reçues :', this.attributions);
    }
  }
  getIconChar(unicode: string): string {
    return String.fromCharCode(parseInt(unicode, 16));
  }
}
