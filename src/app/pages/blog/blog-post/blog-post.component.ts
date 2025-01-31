import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { BlogPost, Language, CodeSnippet, ContentItem, Media, MediaItem, BlogConclusion } from '../../../models/blog-post.model';
import { BlogPost } from '../../../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { BlogPostsService } from '../../../shared/services/blog-posts.service';
import { SwiperSliderComponent } from '../../../components/swiper-slider/swiper-slider.component';
import { CodeSnippetsComponent } from '../../../components/code-snippets/code-snippets.component';
import { ScrollService } from '../../../shared/services/scroll.service';

@Component({
  selector: 'app-blog-post',
  // imports: [CommonModule, SwiperSliderComponent, CodeSnippetsComponent],
  imports: [CommonModule, CodeSnippetsComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
  standalone: true,
})
export class BlogPostComponent implements OnInit {
  @Input() post?: BlogPost;
  // @Input() codeSnippets: any[] = [];
  // @Input() codeSnippets: CodeSnippet[] = [];
  // @Input() mediaItems: MediaItem[] = [];
  // @Input() languages: Language[] = [];
  // @Input() contentItems: ContentItem[] = [];
  // @Input() media: Media[] = [];
  // @Input() conclusion: BlogConclusion[] = [];

  category!: string;
  slug!: string;
  id!: number;

  imageURLs: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostsService,
    private scrollService: ScrollService
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
    } else {
      // post is already provided as input
      this.setImageURLs();
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
      } else {
        // Set image URLs after fetching the post
        this.setImageURLs();
      }
    });
  }

  setImageURLs() {
    this.imageURLs = this.post?.media?.images?.map((image) => image.url) ?? [];
  }

  scrollTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }

  // createSlug(title: string): string {
  //   return title
  //     .toLowerCase()
  //     .replace(/[^a-z0-9]+/g, '-')
  //     .replace(/^-+|-+$/g, '');
  // }
}
