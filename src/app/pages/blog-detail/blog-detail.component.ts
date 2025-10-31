import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, map, combineLatest } from 'rxjs';
import { Blog } from '@/app/models/blog.model';
import { User } from '@/app/models/user.model';
import * as BlogActions from '@/app/store/blog/blog.actions';
import * as UserActions from '@/app/store/user/user.actions';
import { selectAllBlogs } from '@/app/store/blog/blog.selectors';
import { selectAllUsers } from '@/app/store/user/user.selector';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {
  blog$!: Observable<Blog | undefined>;
  userList: User[] = [];
  allBlogs: Blog[] = [];
  currentBlogId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.store.dispatch(BlogActions.loadBlogs());
    this.store.dispatch(UserActions.loadUsers());

    this.route.params.subscribe(params => {
      this.currentBlogId = +params['id'];
      this.blog$ = this.store.select(selectAllBlogs).pipe(
        map(blogs => blogs.find(blog => blog.id === this.currentBlogId))
      );
    });

    this.store.select(selectAllBlogs).subscribe(blogs => this.allBlogs = blogs);
    this.store.select(selectAllUsers).subscribe(users => this.userList = users);
  }

  getUserName(userId: number): string {
    const user = this.userList.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  }

  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  getPreviousBlog(): number | null {
    const currentIndex = this.allBlogs.findIndex(blog => blog.id === this.currentBlogId);
    return currentIndex > 0 ? this.allBlogs[currentIndex - 1].id : null;
  }

  getNextBlog(): number | null {
    const currentIndex = this.allBlogs.findIndex(blog => blog.id === this.currentBlogId);
    return currentIndex < this.allBlogs.length - 1 ? this.allBlogs[currentIndex + 1].id : null;
  }
}