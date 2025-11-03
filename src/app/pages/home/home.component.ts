import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BlogWithAuthor } from '@/app/models/blog.model';
import * as BlogActions from '@/app/store/blog/blog.actions';
import { selectLatestBlogs } from '@/app/store/blog/blog.selectors';
import { getSafeHtml } from '@/app/utils/html.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  title = 'Welcome to Jackalope';
  latestBlogs$!: Observable<BlogWithAuthor[]>;

  constructor(private store: Store, private sanitizer: DomSanitizer) {}

  getSafeHtml(content: string): SafeHtml {
    return getSafeHtml(this.sanitizer, content);
  }

  ngOnInit() {
    this.store.dispatch(BlogActions.loadLatestBlogs());
    this.latestBlogs$ = this.store.select(selectLatestBlogs);
  }




}
