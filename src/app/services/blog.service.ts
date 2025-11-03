import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, BlogWithAuthor } from '@/app/models/blog.model';
import { environment } from '@/environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blog`;

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<BlogWithAuthor[]> {
    return this.http.get<BlogWithAuthor[]>(this.apiUrl);
  }

  getBlog(id: number): Observable<BlogWithAuthor> {
    return this.http.get<BlogWithAuthor>(`${this.apiUrl}/${id}`);
  }

  createBlog(
    blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<BlogWithAuthor> {
    return this.http.post<BlogWithAuthor>(this.apiUrl, blog);
  }

  updateBlog(blog: Blog): Observable<BlogWithAuthor> {
    return this.http.put<BlogWithAuthor>(`${this.apiUrl}/${blog.id}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getLatestBlogs(): Observable<BlogWithAuthor[]> {
    return this.http.get<BlogWithAuthor[]>(`${this.apiUrl}/latest`);
  }
}
