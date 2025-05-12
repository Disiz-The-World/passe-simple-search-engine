import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [MatButtonModule, RouterModule, CommonModule, MatIconModule],
  templateUrl: './teapot.component.html',
  styleUrl: './teapot.component.scss',
})
export class TeapotComponent {
  imagePath: string = 'assets/418.png';
}
