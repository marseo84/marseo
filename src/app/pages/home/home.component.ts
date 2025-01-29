import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProjectsService } from '../../shared/services/projects.service';
import { BlogPostsService } from '../../shared/services/blog-posts.service';
import { CodegnettesService } from '../../shared/services/codegnettes.service';
import { CardComponent } from '../../components/card/card.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent, HeroComponent, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit {
  heroData: any;
  featuredProjects: any[] = [];
  latestBlogPosts: any[] = [];
  latestCodegnettes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private blogPostsService: BlogPostsService,
    private codegnettesService: CodegnettesService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.heroData = data['hero'];
    });

    this.projectsService.getFeaturedProjects().subscribe((projects) => {
      this.featuredProjects = projects;
    });

    this.blogPostsService.getLatestBlogPosts(4).subscribe((posts) => {
      this.latestBlogPosts = posts;
    });

    this.codegnettesService.getLatestCodegnettes(4).subscribe((codegnettes) => {
      this.latestCodegnettes = codegnettes;
    });
  }
}
