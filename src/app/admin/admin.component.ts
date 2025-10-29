import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '@/app/store/auth/auth.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="accent">
      <span>Admin Panel</span>
      <span class="spacer"></span>
      <a matButton routerLink="/admin/users">Users</a>
      <a matButton routerLink="/admin/blog">Blog</a>
      <button matButton (click)="logout()">Logout</button>
    </mat-toolbar>
    
    <div class="container">
      <router-outlet />
    </div>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .container {
      padding: 20px;
    }
    a[matButton] {
      color: white;
      text-decoration: none;
    }
  `]
})
export class AdminComponent {
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}