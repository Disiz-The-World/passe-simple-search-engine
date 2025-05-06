import { Component } from '@angular/core';
import { HeroCardComponent } from '../hero-card/hero-card.component';

@Component({
  selector: 'app-home-page',
  imports: [
    HeroCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

}
