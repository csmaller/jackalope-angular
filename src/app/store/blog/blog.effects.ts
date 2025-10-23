import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BlogService } from '@/app/services/blog.service';
import * as BlogActions from './blog.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class BlogEffects {
  private actions$ = inject(Actions);
  private blogService = inject(BlogService);

  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogs),
      mergeMap(() =>
        this.blogService.getBlogs().pipe(
          map((blogs) => BlogActions.loadBlogsSuccess({ blogs })),
          catchError((error) => of(BlogActions.loadBlogsFailure({ error: error.message })))
        )
      )
    )
  );

  loadBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlog),
      mergeMap(({ id }) =>
        this.blogService.getBlog(id).pipe(
          map((blog) => BlogActions.loadBlogSuccess({ blog })),
          catchError((error) => of(BlogActions.loadBlogFailure({ error: error.message })))
        )
      )
    )
  );

  createBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.createBlog),
      mergeMap(({ blog }) =>
        this.blogService.createBlog(blog).pipe(
          map((blog) => BlogActions.createBlogSuccess({ blog })),
          catchError((error) => of(BlogActions.createBlogFailure({ error: error.message })))
        )
      )
    )
  );

  updateBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.updateBlog),
      mergeMap(({ blog }) =>
        this.blogService.updateBlog(blog).pipe(
          map((blog) => BlogActions.updateBlogSuccess({ blog })),
          catchError((error) => of(BlogActions.updateBlogFailure({ error: error.message })))
        )
      )
    )
  );

  deleteBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.deleteBlog),
      mergeMap(({ id }) =>
        this.blogService.deleteBlog(id).pipe(
          map(() => BlogActions.deleteBlogSuccess({ id })),
          catchError((error) => of(BlogActions.deleteBlogFailure({ error: error.message })))
        )
      )
    )
  );
}