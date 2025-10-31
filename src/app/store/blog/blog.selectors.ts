import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BlogState } from './blog.reducer';

export const selectBlogState = createFeatureSelector<BlogState>('blogs');

export const selectAllBlogs = createSelector(selectBlogState, (state) => state.blogs);
export const selectLatestBlogs = createSelector(selectBlogState, (state) => state.latestBlogs);
export const selectSelectedBlog = createSelector(selectBlogState, (state) => state.selectedBlog);
export const selectBlogLoading = createSelector(selectBlogState, (state) => state.loading);
export const selectBlogError = createSelector(selectBlogState, (state) => state.error);