import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Blog } from '@/app/models/blog.model';
import { User } from '@/app/models/user.model';
import * as BlogActions from '@/app/store/blog/blog.actions';
import * as UserActions from '@/app/store/user/user.actions';
import { selectAllBlogs, selectBlogLoading } from '@/app/store/blog/blog.selectors';
import { selectAllUsers } from '@/app/store/user/user.selector';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogsComponent implements OnInit {
  blogs$!: Observable<Blog[]>;
  loading$!: Observable<boolean>;
  userList: User[] = [];

  constructor(private store: Store, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.blogs$ = this.store.select(selectAllBlogs);
    this.loading$ = this.store.select(selectBlogLoading);
    this.store.dispatch(BlogActions.loadBlogs());
    this.store.dispatch(UserActions.loadUsers());
    
    this.store.select(selectAllUsers).subscribe(users => this.userList = users);
  }

  getUserName(userId: number): string {
    const user = this.userList.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }

  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}