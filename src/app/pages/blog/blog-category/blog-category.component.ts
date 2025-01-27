import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../../../models/blog-post.model';
import { BlogPostsService } from '../../../shared/services/blog-posts.service';
import { CommonModule } from '@angular/common';
import { BlogPostComponent } from '../blog-post/blog-post.component';

@Component({
  selector: 'app-blog-category',
  imports: [CommonModule, BlogPostComponent],
  templateUrl: './blog-category.component.html',
  styleUrl: './blog-category.component.scss',
  standalone: true,
})
export class BlogCategoryComponent implements OnInit {
  // @Input() category!: string;
  // @Input() post!: BlogPost[];

  category!: string;
  posts: BlogPost[] = [];
  filteredPosts: BlogPost[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostsService
  ) {}

  ngOnInit(): void {
    // get the category from the route
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.fetchBlogPosts();
    });
  }

  fetchBlogPosts(): void {
    this.blogPostService.getBlogPosts().subscribe((posts) => {
      this.posts = posts;
      this.filteredPosts = this.posts.filter(
        (post) => post.category === this.category
      );
    });
  }

  // get filteredPosts(): BlogPost[] {
  //   return this.filteredPosts.filter((post) => post.category === this.category);
  // }
}
