import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { BlogPostsService } from '../../../shared/services/blog-posts.service';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  standalone: true,
})
export class BlogPostComponent implements OnInit {
  @Input() post?: BlogPost;
  category!: string;
  slug!: string;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostsService
  ) {}

  ngOnInit(): void {
    // If post is not provided as Input, fetch it based on URL params
    if (!this.post) {
      this.route.params.subscribe((params) => {
        this.category = params['category'];
        this.slug = params['slug'];
        this.id = +params['id'];
        this.fetchBlogPost();
      });
    }
  }

  fetchBlogPost(): void {
    this.blogPostService.getBlogPosts().subscribe((posts) => {
      this.post = posts.find(
        (post: BlogPost) =>
          post.id === this.id &&
          post.slug === this.slug &&
          post.category === this.category
      );

      if (!this.post) {
        console.error('Blog post not found');
      }
    });
  }

  // createSlug(title: string): string {
  //   return title
  //     .toLowerCase()
  //     .replace(/[^a-z0-9]+/g, '-')
  //     .replace(/^-+|-+$/g, '');
  // }
}
