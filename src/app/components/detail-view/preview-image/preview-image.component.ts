import { Component, input, Input } from '@angular/core';
import { TagsComponent } from '../../tags/tags.component';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss'],
  imports: [TagsComponent],
})
export class PreviewImageComponent {
  @Input() previewPath!: string;
  @Input() title!: string;
  @Input() tags: { id: number; name: string; icon: string }[] = [];
  @Input() catchPhrase!: string;
}
