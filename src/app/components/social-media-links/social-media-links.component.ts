import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social-media-links',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './social-media-links.component.html',
  styleUrl: './social-media-links.component.scss',
  standalone: true,
})
export class SocialMediaLinksComponent {
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faInstagram = faInstagram;
}
