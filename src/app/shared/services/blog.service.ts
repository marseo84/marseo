import { Injectable } from '@angular/core';
import { BlogPostsService } from './blog-posts.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { ContentItem } from '../../models/blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private blogPostsService: BlogPostsService) {}

  // get all blog posts
  getAllPosts(): Observable<any[]> {
    return this.blogPostsService.getBlogPosts();
  }

  // get latest blog posts
  getLatestPosts(count: number): Observable<any[]> {
    return this.blogPostsService.getLatestBlogPosts(count);
  }

  // get blog posts by category
  getPostsByCategory(category: string): Observable<any[]> {
    return this.blogPostsService
      .getBlogPosts()
      .pipe(map((posts) => posts.filter((post) => post.category === category)));
  }

  // Search posts by a keyword
  searchPosts(keyword: string): Observable<any[]> {
    return this.blogPostsService
      .getBlogPosts()
      .pipe(
        map((posts) =>
          posts.filter(
            (post) =>
              post.title.toLowerCase().includes(keyword.toLowerCase()) ||
              post.tags.some((tag: string) =>
                tag.toLowerCase().includes(keyword.toLowerCase())
              ) ||
              post.content.some(
                (item: ContentItem) =>
                  item.textContent &&
                  item.textContent
                    .toString()
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
              )
          )
        )
      );
  }

  // filter posts by date range
  filterPostsByDate(startDate: Date, endDate: Date): Observable<any[]> {
    return this.blogPostsService.getBlogPosts().pipe(
      map((posts) =>
        posts.filter((post) => {
          const postDate = new Date(post.publishDate);
          return postDate >= startDate && postDate <= endDate;
        })
      )
    );
  }

  // sort posts by date (latest first)
  sortPostsByDate(posts: any[]): any[] {
    return posts.sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
  }

  // sort posts by title (alphabetically)
  sortPostsByTitle(posts: any[]): any[] {
    return posts.sort((a, b) => a.title.localeCompare(b.title));
  }

  // get posts by a specific author
  // if used, author to be added to BlogPost model
  // getPostsByAuthor(author: string): Observable<any[]> {
  //   return this.blogPostsService
  //     .getBlogPosts()
  //     .pipe(map((posts) => posts.filter((post) => post.author === author)));
  // }

  // get the top N most popular posts (by views or likes)
  getMostPopularPosts(count: number): Observable<any[]> {
    return this.blogPostsService.getBlogPosts().pipe(
      // map((posts) => posts.sort((a, b) => b.views - a.views).slice(0, count))
      map((posts) =>
        posts.sort((a, b) => b.popularity - a.popularity).slice(0, count)
      )
    );
  }

  // get posts by a specific tag
  getPostsByTag(tag: string): Observable<any[]> {
    return this.blogPostsService
      .getBlogPosts()
      .pipe(map((posts) => posts.filter((post) => post.tags.includes(tag))));
  }

  // get posts by popular categories
  getPostsGroupedByCategory(): Observable<any[]> {
    return this.blogPostsService.getBlogPosts().pipe(
      map((posts) => {
        const groupedPosts = posts.reduce((acc, post) => {
          if (!acc[post.category]) acc[post.category] = [];
          acc[post.category].push(post);
          return acc;
        }, {});
        return groupedPosts;
      })
    );
  }

  // get posts with comments
  getPostsWithComments(): Observable<any[]> {
    return this.blogPostsService
      .getBlogPosts()
      .pipe(
        map((posts) =>
          posts.filter((post) => post.comments && post.comments.length > 0)
        )
      );
  }

  // get posts with pagination
  getPaginatedPosts(page: number, limit: number): Observable<any[]> {
    return this.blogPostsService
      .getBlogPosts()
      .pipe(map((posts) => posts.slice((page - 1) * limit, page * limit)));
  }

  // get featured posts
  getFeaturedPosts(): Observable<any[]> {
    return this.blogPostsService
      .getBlogPosts()
      .pipe(map((posts) => posts.filter((post) => post.featured)));
  }
}
