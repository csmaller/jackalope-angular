import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AuthActions from '@/app/store/auth/auth.actions';
import {
  selectAuthLoading,
  selectAuthError,
} from '@/app/store/auth/auth.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>Admin Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="credentials.email" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Password</mat-label>
            <input
              matInput
              type="password"
              [(ngModel)]="credentials.password"
            />
          </mat-form-field>

          <div *ngIf="loading$ | async" class="text-center mb-4">
            <mat-progress-spinner
              mode="indeterminate"
              diameter="30"
            ></mat-progress-spinner>
          </div>

          <div *ngIf="error$ | async as error" class="error">{{ error }}</div>
        </mat-card-content>
        <mat-card-actions>
          <button matRaisedButton color="primary" (click)="login()">
            Login
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
      }
      .login-card {
        width: 400px;
      }
      .full-width {
        width: 100%;
      }
      .error {
        color: red;
        margin-top: 10px;
      }
    `,
  ],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  login() {
    this.store.dispatch(AuthActions.login({ credentials: this.credentials }));
  }
}
