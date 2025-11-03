import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { BlogWithAuthor } from '@/app/models/blog.model';
import * as BlogActions from '@/app/store/blog/blog.actions';
import { selectAllBlogs } from '@/app/store/blog/blog.selectors';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css',
})
export class BlogDetailComponent implements OnInit {
  blog$!: Observable<BlogWithAuthor | undefined>;
  allBlogs: BlogWithAuthor[] = [];
  currentBlogId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.store.dispatch(BlogActions.loadBlogs());

    this.route.params.subscribe((params) => {
      this.currentBlogId = +params['id'];
      this.blog$ = this.store
        .select(selectAllBlogs)
        .pipe(
          map((blogs) => blogs.find((blog) => blog.id === this.currentBlogId))
        );
    });

    this.store
      .select(selectAllBlogs)
      .subscribe((blogs) => (this.allBlogs = blogs));
  }



  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  getPreviousBlog(): number | null {
    const currentIndex = this.allBlogs.findIndex(
      (blog) => blog.id === this.currentBlogId
    );
    return currentIndex > 0 ? this.allBlogs[currentIndex - 1].id : null;
  }

  getNextBlog(): number | null {
    const currentIndex = this.allBlogs.findIndex(
      (blog) => blog.id === this.currentBlogId
    );
    return currentIndex < this.allBlogs.length - 1
      ? this.allBlogs[currentIndex + 1].id
      : null;
  }
}
