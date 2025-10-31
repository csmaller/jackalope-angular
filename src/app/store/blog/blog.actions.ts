import { createAction, props } from '@ngrx/store';
import { Blog } from '@/app/models/blog.model';

export const loadBlogs = createAction('[Blog] Load Blogs');
export const loadBlogsSuccess = createAction('[Blog] Load Blogs Success', props<{ blogs: Blog[] }>());
export const loadBlogsFailure = createAction('[Blog] Load Blogs Failure', props<{ error: string }>());

export const loadBlog = createAction('[Blog] Load Blog', props<{ id: number }>());
export const loadBlogSuccess = createAction('[Blog] Load Blog Success', props<{ blog: Blog }>());
export const loadBlogFailure = createAction('[Blog] Load Blog Failure', props<{ error: string }>());

export const createBlog = createAction('[Blog] Create Blog', props<{ blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'> }>());
export const createBlogSuccess = createAction('[Blog] Create Blog Success', props<{ blog: Blog }>());
export const createBlogFailure = createAction('[Blog] Create Blog Failure', props<{ error: string }>());

export const updateBlog = createAction('[Blog] Update Blog', props<{ blog: Blog }>());
export const updateBlogSuccess = createAction('[Blog] Update Blog Success', props<{ blog: Blog }>());
export const updateBlogFailure = createAction('[Blog] Update Blog Failure', props<{ error: string }>());

export const deleteBlog = createAction('[Blog] Delete Blog', props<{ id: number }>());
export const deleteBlogSuccess = createAction('[Blog] Delete Blog Success', props<{ id: number }>());
export const deleteBlogFailure = createAction('[Blog] Delete Blog Failure', props<{ error: string }>());

export const loadLatestBlogs = createAction('[Blog] Load Latest Blogs');
export const loadLatestBlogsSuccess = createAction('[Blog] Load Latest Blogs Success', props<{ blogs: Blog[] }>());
export const loadLatestBlogsFailure = createAction('[Blog] Load Latest Blogs Failure', props<{ error: string }>());