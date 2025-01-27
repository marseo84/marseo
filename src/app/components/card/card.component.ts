import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeImage } from '../../models/code-image.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() id: string | number = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() codeImage?: CodeImage = {};
  @Input() tags?: string[] = [];
  @Input() slug: string = '';
  @Input() type: string = ''; // 'project', 'blog', 'codegnette'
  @Input() category?: string = ''; // for blog posts

  generateLink(): string {
    switch (this.type) {
      case 'project':
        return `/projects/${this.id}/${this.slug}`;
      case 'blog':
        return `/blog/${this.category}/${this.id}/${this.slug}`;
      case 'codegnette':
        return `/codegnettes/${this.id}/${this.slug}`;
      default:
        return '/';
    }
  }
}
