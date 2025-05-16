import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-information',
  imports: [CommonModule, MatIcon],
  templateUrl: './information.component.html',
  styleUrl: './information.component.scss',
  standalone: true,
})
export class InformationComponent {
  @Input() infos!: { icon: string; name: string; description: string }[];
  @Input() map!: string;
  @Input() attributions!: {
    Illustrations: string;
    Textes: string;
    Images: string;
  };
  @Input() seeMore!: string[];
}
