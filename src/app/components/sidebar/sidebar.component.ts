import { Component } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-sidebar',
  imports: [
    MatSidenavContent,
    MatToolbar,
    MatIcon,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {}
