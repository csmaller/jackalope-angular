import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import * as UserActions from '@/app/store/user/user.actions';
import { selectAllUsers, selectUserLoading } from '@/app/store/user/user.selector';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatListModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <mat-card class="create-card">
      <mat-card-header>
        <mat-card-title>Create New User</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>First Name</mat-label>
          <input matInput [(ngModel)]="newUser.firstName" />
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Last Name</mat-label>
          <input matInput [(ngModel)]="newUser.lastName" />
        </mat-form-field>
        
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" [(ngModel)]="newUser.email" />
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button matRaisedButton color="primary" (click)="createUser()">Create User</button>
      </mat-card-actions>
    </mat-card>

    <mat-card class="users-list-card">
      <mat-card-header>
        <mat-card-title>Users</mat-card-title>
        <mat-card-subtitle>Manage system users</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <button matRaisedButton color="primary" (click)="reload()">
          Reload Users
        </button>
        <mat-progress-spinner *ngIf="loading$ | async" mode="indeterminate"></mat-progress-spinner>
        
        <mat-card *ngFor="let user of users$ | async" class="user-item">
          <div *ngIf="editingId !== user.id">
            <mat-card-header>
              <mat-card-title>{{ user.firstName }} {{ user.lastName }}</mat-card-title>
              <mat-card-subtitle>{{ user.email }}</mat-card-subtitle>
            </mat-card-header>
            <mat-card-actions>
              <button matButton color="primary" (click)="editUser(user)">
                <mat-icon>edit</mat-icon> Edit
              </button>
              <button matButton color="warn" (click)="deleteUser(user.id)">
                <mat-icon>delete</mat-icon> Delete
              </button>
            </mat-card-actions>
          </div>
          
          <div *ngIf="editingId === user.id">
            <mat-card-content>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>First Name</mat-label>
                <input matInput [(ngModel)]="editForm.firstName" />
              </mat-form-field>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Last Name</mat-label>
                <input matInput [(ngModel)]="editForm.lastName" />
              </mat-form-field>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email</mat-label>
                <input matInput type="email" [(ngModel)]="editForm.email" />
              </mat-form-field>
            </mat-card-content>
            <mat-card-actions>
              <button matRaisedButton color="primary" (click)="updateUser()">
                <mat-icon>save</mat-icon> Save
              </button>
              <button matButton (click)="cancelEdit()">
                <mat-icon>cancel</mat-icon> Cancel
              </button>
            </mat-card-actions>
          </div>
        </mat-card>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .create-card, .users-list-card {
      margin: 20px 0;
    }
    .user-item {
      margin: 16px 0;
    }
    .full-width {
      width: 100%;
    }
    mat-progress-spinner {
      margin: 20px auto;
    }
  `]
})
export class UsersComponent implements OnInit {
  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;
  
  newUser = { firstName: '', lastName: '', email: '' };
  editForm = { id: 0, firstName: '', lastName: '', email: '' };
  editingId: number | null = null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectUserLoading);
    this.store.dispatch(UserActions.loadUsers());
  }

  reload() {
    this.store.dispatch(UserActions.loadUsers());
  }

  createUser() {
    if (this.newUser.firstName && this.newUser.lastName && this.newUser.email) {
      this.store.dispatch(UserActions.createUser({ user: this.newUser as User }));
      this.newUser = { firstName: '', lastName: '', email: '' };
    }
  }

  editUser(user: User) {
    this.editingId = user.id;
    this.editForm = { ...user };
  }

  updateUser() {
    this.store.dispatch(UserActions.updateUser({ user: this.editForm as User }));
    this.cancelEdit();
  }

  deleteUser(id: number) {
    this.store.dispatch(UserActions.deleteUser({ userId: id }));
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm = { id: 0, firstName: '', lastName: '', email: '' };
  }
}