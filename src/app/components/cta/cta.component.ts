import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cta',
  imports: [CommonModule, RouterModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss',
  standalone: true,
})
export class CtaComponent {
  @Input() ctaTaglinePrimary: string = '';
  @Input() ctaBtnPrimaryLink: string = '';
  @Input() ctaBtnPrimary: string = '';
  @Input() ctaTaglineSecondary: string = '';
  @Input() ctaBtnSecondary: string = '';
  @Input() ctaBtnSecondaryLink: string = '';
  @Input() styleClass: string = '';
}
