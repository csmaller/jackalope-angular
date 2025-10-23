import { createReducer, on } from '@ngrx/store';
import { Blog } from '@/app/models/blog.model';
import * as BlogActions from './blog.actions';

export interface BlogState {
  blogs: Blog[];
  selectedBlog: Blog | null;
  loading: boolean;
  error: string | null;
}

export const initialState: BlogState = {
  blogs: [],
  selectedBlog: null,
  loading: false,
  error: null,
};

export const blogReducer = createReducer(
  initialState,
  on(BlogActions.loadBlogs, (state) => ({ ...state, loading: true })),
  on(BlogActions.loadBlogsSuccess, (state, { blogs }) => ({ ...state, loading: false, blogs })),
  on(BlogActions.loadBlogsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  on(BlogActions.loadBlog, (state) => ({ ...state, loading: true })),
  on(BlogActions.loadBlogSuccess, (state, { blog }) => ({ ...state, loading: false, selectedBlog: blog })),
  on(BlogActions.loadBlogFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  on(BlogActions.createBlog, (state) => ({ ...state, loading: true })),
  on(BlogActions.createBlogSuccess, (state, { blog }) => ({ ...state, loading: false, blogs: [...state.blogs, blog] })),
  on(BlogActions.createBlogFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  on(BlogActions.updateBlog, (state) => ({ ...state, loading: true })),
  on(BlogActions.updateBlogSuccess, (state, { blog }) => ({ ...state, loading: false, blogs: state.blogs.map(b => b.id === blog.id ? blog : b) })),
  on(BlogActions.updateBlogFailure, (state, { error }) => ({ ...state, loading: false, error })),
  
  on(BlogActions.deleteBlog, (state) => ({ ...state, loading: true })),
  on(BlogActions.deleteBlogSuccess, (state, { id }) => ({ ...state, loading: false, blogs: state.blogs.filter(b => b.id !== id) })),
  on(BlogActions.deleteBlogFailure, (state, { error }) => ({ ...state, loading: false, error }))
);