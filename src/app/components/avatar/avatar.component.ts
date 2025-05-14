import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatCardModule],
})
export class AvatarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  avatar: string = '';

  async ngOnInit(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    this.avatar = user?.profilePicture || '';
  }
}
