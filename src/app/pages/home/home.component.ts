import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Blog } from '@/app/models/blog.model';
import { User } from '@/app/models/user.model';
import * as BlogActions from '@/app/store/blog/blog.actions';
import * as UserActions from '@/app/store/user/user.actions';
import { selectLatestBlogs } from '@/app/store/blog/blog.selectors';
import { selectAllUsers } from '@/app/store/user/user.selector';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  title = 'Welcome to Jackalope';
  latestBlogs$!: Observable<Blog[]>;
  userList: User[] = [];

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.store.dispatch(BlogActions.loadLatestBlogs());
    this.store.dispatch(UserActions.loadUsers());

    this.latestBlogs$ = this.store.select(selectLatestBlogs);

    this.store
      .select(selectAllUsers)
      .subscribe((users) => (this.userList = users));
  }

  getUserName(userId: number): string {
    const user = this.userList.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }

  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
