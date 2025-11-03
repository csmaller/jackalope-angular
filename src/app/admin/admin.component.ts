import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '@/app/store/auth/auth.actions';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
  ],
  template: `
    <mat-toolbar color="accent">
      <span>Admin Panel</span>
      <span class="spacer"></span>
      <a matButton routerLink="/admin/blog" routerLinkActive="active">Blogs</a>
      <a matButton routerLink="/admin/users" routerLinkActive="active">Users</a>
      <button matButton (click)="logout()">Logout</button>
    </mat-toolbar>

    <div class="container">
      <router-outlet />
    </div>
  `,
  styles: [
    `
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
      a[matButton].active {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }
    `,
  ],
})
export class AdminComponent {
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
