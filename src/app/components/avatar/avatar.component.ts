import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  imports: [MatIconModule, MatCardModule, NgOptimizedImage],
})
export class AvatarComponent {
  avatar: string = 'avatar.jpeg'; // Replace with your avatar image path
}
