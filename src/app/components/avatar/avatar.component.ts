import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
import { NgOptimizedImage } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-avatar',
  standalone: true,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  imports: [MatIconModule, MatCardModule, NgOptimizedImage, MatDialogModule],
})

export class AvatarComponent implements OnInit {
  avatar: string = 'assets/avatar.jpeg';

  constructor(private dialog: MatDialog, private authService: AuthService) {}
  
  async ngOnInit(): Promise<void> {
    const user = await this.authService.getCurrentUser();
    this.avatar = user?.profilePicture || '';
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      panelClass: 'login-dialog-panel',
    });
  }
}
