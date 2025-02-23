import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkillsComponent } from '../../components/skills/skills.component';
import { SocialMediaLinksComponent } from '../../components/social-media-links/social-media-links.component';

@Component({
  selector: 'app-about',
  imports: [
    HeroComponent,
    CommonModule,
    RouterModule,
    SkillsComponent,
    SocialMediaLinksComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true,
})
export class AboutComponent implements OnInit {
  heroData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.heroData = data['hero'];
    });
  }
}
