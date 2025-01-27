import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsService {
  private blogPostUrl = 'assets/data/blog-posts.json';

  constructor(private http: HttpClient) {}

  getBlogPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.blogPostUrl);
  }

  getLatestBlogPosts(count: number): Observable<any[]> {
    return this.getBlogPosts().pipe(map((posts) => posts.slice(0, count)));
  }
}
