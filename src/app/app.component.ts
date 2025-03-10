// import Prism from 'prismjs';
// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-typescript';
// import 'prismjs/components/prism-css';
// import 'prismjs/components/prism-scss';
// import 'prismjs/components/prism-php';
// import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
  Scroll,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { CommonModule, ViewportScroller } from '@angular/common';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
// import { HeroComponent } from './components/hero/hero.component';
import { CtaComponent } from './components/cta/cta.component';
import { HeroData, CtaData } from './models/components.interface';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    // HeroComponent,
    CtaComponent,
    FooterComponent,
    CommonModule,
    RouterModule,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'marseo';

  // heroData: { title: string; subtitle: string; styleClass: string } | null =
  //   null;

  // ctaData: {
  //   ctaTaglinePrimary: string;
  //   ctaBtnPrimary: string;
  //   ctaBtnPrimaryLink: string;
  //   ctaTaglineSecondary: string;
  //   ctaBtnSecondary: string;
  //   ctaBtnSecondaryLink: string;
  //   styleClass: string;
  // } | null = null;

  heroData: HeroData | null = null;
  ctaData: CtaData | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.route.firstChild),
        map((childRoute) => childRoute?.snapshot.data || {})
      )
      .subscribe((data) => {
        this.heroData = data['hero'] || null;
        this.ctaData = data['cta'] || null;
      });

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        this.viewportScroller.scrollToPosition([0, 0]);
      });

    // Prism.highlightAll();
  }
}
