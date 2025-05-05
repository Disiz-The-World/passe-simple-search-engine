import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InformationComponent } from './information/information.component';

@Component({
  selector: 'app-useful-info',
  imports: [InformationComponent],
  templateUrl: './useful-info.component.html',
  styleUrl: './useful-info.component.scss',
  standalone: true,
})
export class UsefulInfoComponent implements OnChanges {
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
      console.log('Infos reçues dans UsefulInfoComponent:', this.infos);
    }
  }
}
