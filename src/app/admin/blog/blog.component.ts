import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Blog } from '@/app/models/blog.model';
import { User } from '@/app/models/user.model';
import * as BlogActions from '@/app/store/blog/blog.actions';
import * as UserActions from '@/app/store/user/user.actions';
import {
  selectAllBlogs,
  selectBlogLoading,
} from '@/app/store/blog/blog.selectors';
import { selectAllUsers } from '@/app/store/user/user.selector';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  template: `
    <mat-card class="create-card">
      <mat-card-header>
        <mat-card-title>Create New Blog</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Title</mat-label>
          <input matInput [(ngModel)]="newBlog.title" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Author</mat-label>
          <mat-select [(ngModel)]="newBlog.authorId">
            <mat-option *ngFor="let user of users$ | async" [value]="user.id">
              {{ user.firstName }} {{ user.lastName }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Content</mat-label>
          <textarea matInput rows="4" [(ngModel)]="newBlog.content"></textarea>
        </mat-form-field>
      </mat-card-content>
      <mat-card-actions>
        <button matRaisedButton color="primary" (click)="createBlog()">
          Create Blog
        </button>
      </mat-card-actions>
    </mat-card>

    <mat-card class="blog-list-card">
      <mat-card-header>
        <mat-card-title>Blog Posts</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-progress-spinner
          *ngIf="loading$ | async"
          mode="indeterminate"
        ></mat-progress-spinner>

        <mat-card *ngFor="let blog of blogs$ | async" class="blog-item">
          <div *ngIf="editingId !== blog.id">
            <mat-card-header>
              <mat-card-title>{{ blog.title }}</mat-card-title>
              <mat-card-subtitle
                >By: {{ getUserName(blog.authorId) }}</mat-card-subtitle
              >
            </mat-card-header>
            <mat-card-content>
              <p>{{ blog.content }}</p>
            </mat-card-content>
            <mat-card-actions>
              <button matButton color="primary" (click)="editBlog(blog)">
                <mat-icon>edit</mat-icon> Edit
              </button>
              <button matButton color="warn" (click)="deleteBlog(blog.id)">
                <mat-icon>delete</mat-icon> Delete
              </button>
            </mat-card-actions>
          </div>

          <div *ngIf="editingId === blog.id">
            <mat-card-content>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Title</mat-label>
                <input matInput [(ngModel)]="editForm.title" />
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Author</mat-label>
                <mat-select [(ngModel)]="editForm.authorId">
                  <mat-option
                    *ngFor="let user of users$ | async"
                    [value]="user.id"
                  >
                    {{ user.firstName }} {{ user.lastName }}
                  </mat-option>
                </mat-select>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Content</mat-label>
                <textarea
                  matInput
                  rows="4"
                  [(ngModel)]="editForm.content"
                ></textarea>
              </mat-form-field>
            </mat-card-content>
            <mat-card-actions>
              <button matRaisedButton color="primary" (click)="updateBlog()">
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
  styles: [
    `
      .create-card,
      .blog-list-card {
        margin: 20px 0;
      }
      .blog-item {
        margin: 16px 0;
      }
      .full-width {
        width: 100%;
      }
      mat-progress-spinner {
        margin: 20px auto;
      }
    `,
  ],
})
export class BlogComponent implements OnInit {
  blogs$!: Observable<Blog[]>;
  users$!: Observable<User[]>;
  loading$!: Observable<boolean>;

  newBlog = { title: '', content: '', authorId: 0 };
  editForm = {
    id: 0,
    title: '',
    content: '',
    authorId: 0,
    createdAt: '',
    updatedAt: '',
  };
  editingId: number | null = null;
  userList: User[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.blogs$ = this.store.select(selectAllBlogs);
    this.users$ = this.store.select(selectAllUsers);
    this.loading$ = this.store.select(selectBlogLoading);
    this.store.dispatch(BlogActions.loadBlogs());
    this.store.dispatch(UserActions.loadUsers());
    this.users$.subscribe((users) => (this.userList = users));
  }

  createBlog() {
    if (this.newBlog.title && this.newBlog.content && this.newBlog.authorId) {
      this.store.dispatch(BlogActions.createBlog({ blog: this.newBlog }));
      this.newBlog = { title: '', content: '', authorId: 0 };
    }
  }

  editBlog(blog: Blog) {
    this.editingId = blog.id;
    this.editForm = { ...blog };
  }

  updateBlog() {
    this.store.dispatch(BlogActions.updateBlog({ blog: this.editForm }));
    this.cancelEdit();
  }

  deleteBlog(id: number) {
    this.store.dispatch(BlogActions.deleteBlog({ id }));
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm = {
      id: 0,
      title: '',
      content: '',
      authorId: 0,
      createdAt: '',
      updatedAt: '',
    };
  }

  getUserName(userId: number): string {
    const user = this.userList.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }
}