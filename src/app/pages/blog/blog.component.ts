import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BlogWithAuthor } from '@/app/models/blog.model';
import * as BlogActions from '@/app/store/blog/blog.actions';
import { selectAllBlogs, selectBlogLoading } from '@/app/store/blog/blog.selectors';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogsComponent implements OnInit {
  blogs$!: Observable<BlogWithAuthor[]>;
  loading$!: Observable<boolean>;

  constructor(private store: Store, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.blogs$ = this.store.select(selectAllBlogs);
    this.loading$ = this.store.select(selectBlogLoading);
    this.store.dispatch(BlogActions.loadBlogs());
  }



  getSafeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}