import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { loadUsers } from '@/app/store/user/user.actions';
import { selectAllUsers } from '@/app/store/user/user.selector';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatListModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Users</mat-card-title>
        <mat-card-subtitle>Manage system users</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <button matRaisedButton color="primary" (click)="reload()">
          Reload Users
        </button>
        <mat-list>
          <mat-list-item *ngFor="let user of users$ | async">
            <div matListItemTitle>{{ user.firstName }} {{ user.lastName }}</div>
            <div matListItemLine>{{ user.email }}</div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.users$ = this.store.select(selectAllUsers);
    this.store.dispatch(loadUsers());
  }

  reload() {
    this.store.dispatch(loadUsers());
  }
}
