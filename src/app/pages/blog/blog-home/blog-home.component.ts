import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../../../models/blog-post.model';
import { BlogPostsService } from '../../../shared/services/blog-posts.service';
import { CommonModule } from '@angular/common';
// import { BlogPostComponent } from '../blog-post/blog-post.component';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../../shared/services/blog.service';
import { Observable } from 'rxjs';
import { CardComponent } from '../../../components/card/card.component';
import { FilterComponent } from '../../../components/filter/filter.component';

@Component({
  selector: 'app-blog-home',
  imports: [CommonModule, CardComponent, FilterComponent, FormsModule],
  templateUrl: './blog-home.component.html',
  styleUrl: './blog-home.component.scss',
  standalone: true,
})
export class BlogHomeComponent implements OnInit {
  blogPosts: BlogPost[] = [];
  filteredBlogPosts: BlogPost[] = [];
  tags: string[] = [];
  categories: string[] = [];
  codeImage: string = '';
  selectedCategory: string = 'all';
  selectedTag: string = '';
  searchTerm: string = '';
  sortBy: string = 'date'; // Default sorting option

  blogPosts$!: Observable<BlogPost[]>;
  popularPosts$!: Observable<BlogPost[]>;
  searchResults$!: Observable<BlogPost[]>;

  constructor(
    private blogPostService: BlogPostsService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogPostService.getBlogPosts().subscribe((posts) => {
      this.blogPosts = posts;
      this.filteredBlogPosts = posts; // Initialize filteredPosts with all posts
      this.extractTags();
      this.extractCategories();
      this.applyFilters(); // Apply filters and sorting initially
    });
  }

  extractTags(): void {
    const tagSet = new Set<string>();
    this.blogPosts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => tagSet.add(tag));
      }
    });
    this.tags = Array.from(tagSet);
  }

  extractCategories(): void {
    const categorySet = new Set<string>();
    this.blogPosts.forEach((post) => {
      if (post.category) {
        categorySet.add(post.category);
      }
    });
    this.categories = Array.from(categorySet);
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  filterByTag(tag: string): void {
    this.selectedTag = tag;
    this.applyFilters();
  }

  applyFilters(): void {
    // Filter by category and tag
    this.filteredBlogPosts = this.blogPosts.filter((post) => {
      const matchesCategory =
        this.selectedCategory === 'all' ||
        post.category === this.selectedCategory;
      const matchesTag =
        this.selectedTag === '' ||
        (post.tags && post.tags.includes(this.selectedTag));
      const matchesSearch =
        post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesCategory && matchesTag && matchesSearch;
    });

    // Apply sorting
    this.sortPosts();
  }

  sortPosts(): void {
    switch (this.sortBy) {
      case 'date':
        this.filteredBlogPosts.sort(
          (a, b) =>
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
        );
        break;
      case 'title':
        this.filteredBlogPosts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popularity':
        this.filteredBlogPosts.sort(
          (a, b) => (b.popularity || 0) - (a.popularity || 0)
        );
        break;
      default:
        break;
    }
  }

  onSearchTermChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onSortChange(sortBy: string): void {
    this.sortBy = sortBy;
    this.sortPosts();
  }
}

// import { Component, OnInit } from '@angular/core';
// import { BlogPost } from '../../../models/blog-post.model';
// import { BlogPostsService } from '../../../shared/services/blog-posts.service';
// import { CommonModule } from '@angular/common';
// import { BlogPostComponent } from '../blog-post/blog-post.component';
// import { FormsModule } from '@angular/forms';
// import { BlogService } from '../../../shared/services/blog.service';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-blog-home',
//   imports: [CommonModule, BlogPostComponent, FormsModule],
//   templateUrl: './blog-home.component.html',
//   styleUrl: './blog-home.component.scss',
//   standalone: true,
// })
// export class BlogHomeComponent implements OnInit {
//   posts: BlogPost[] = [];
//   tags: string[] = [];
//   categories: string[] = [];
//   selectedCategory: string = 'all';
//   searchTerm: string = '';

//   blogPosts$!: Observable<BlogPost[]>;
//   popularPosts$!: Observable<BlogPost[]>;
//   searchResults$!: Observable<BlogPost[]>;

//   constructor(
//     private blogPostService: BlogPostsService,
//     private blogService: BlogService
//   ) {}

//   ngOnInit(): void {
//     this.blogPosts$ = this.blogService.getPostsByTag('angular');
//     this.popularPosts$ = this.blogService.getMostPopularPosts(5);
//     this.searchResults$ = this.blogService.searchPosts('angular');

//     this.blogPostService.getBlogPosts().subscribe((posts) => {
//       this.posts = posts;
//     });
//   }

//   extractTags(): void {
//     const tagSet = new Set<string>();
//     this.posts.forEach((post) => {
//       if (post.tags && Array.isArray(post.tags)) {
//         post.tags.forEach((tag) => tagSet.add(tag));
//       }
//     });
//     this.tags = Array.from(tagSet);
//   }

//   extractCategories(): void {
//     const categorySet = new Set<string>();
//     this.posts.forEach((post) => {
//       if (post.category) {
//         categorySet.add(post.category);
//       }
//     });
//     this.categories = Array.from(categorySet);
//   }

//   filterPosts(): BlogPost[] {
//     return this.posts.filter(
//       (post) =>
//         post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         post.description.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }
// }
