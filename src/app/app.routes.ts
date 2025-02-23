import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      hero: {
        title: 'marseo',
        subtitle: 'full stack web developer',
        heroText: '',
        styleClass: 'hero-graphic-home',
      },
      cta: {
        ctaTaglinePrimary: 'Ready to Work Together?',
        ctaBtnPrimary: 'Get in Touch',
        ctaBtnPrimaryLink: '/contact',
        ctaTaglineSecondary: 'Want to know more about me?',
        ctaBtnSecondary: 'Learn More',
        ctaBtnSecondaryLink: '/about',
        styleClass: '',
      },
    },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    data: {
      hero: {
        title: 'about me',
        subtitle: 'Hey there,',
        heroText: 'I am Marcel',
        styleClass: 'hero-graphic-about',
      },
      cta: {
        ctaTaglinePrimary: 'Want to know more?',
        ctaBtnPrimary: 'Contact Me',
        ctaBtnPrimaryLink: '/contact',
        ctaTaglineSecondary: 'Let’s connect!',
        ctaBtnSecondary: 'Send a Message',
        ctaBtnSecondaryLink: '/about',
        styleClass: 'cta-about',
      },
    },
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component').then(
        (m) => m.ProjectsComponent
      ),
    data: {
      hero: {
        title: '',
        subtitle: '',
        heroText: '',
        styleClass: 'hero-graphic-projects',
      },
    },
  },
  {
    path: 'projects/:id/:slug',
    loadComponent: () =>
      import('./components/project-details/project-details.component').then(
        (m) => m.ProjectDetailsComponent
      ),
    data: {
      hero: {
        title: '',
        subtitle: '',
        heroText: '',
        styleClass: 'hero-graphic-project-details',
      },
    },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    data: {
      hero: {
        title: '',
        subtitle: '',
        heroText: '',
        styleClass: 'hero-graphic-contact',
      },
    },
  },
  {
    path: 'codegnettes',
    loadComponent: () =>
      import('./pages/codegnettes/codegnettes.component').then(
        (m) => m.CodegnettesComponent
      ),
    data: {
      hero: {
        title: '',
        subtitle: '',
        heroText: '',
        styleClass: 'hero-graphic-codegnettes',
      },
    },
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog-home/blog-home.component').then(
        (m) => m.BlogHomeComponent
      ),
    data: {
      hero: {
        title: '',
        subtitle: '',
        heroText: '',
        styleClass: 'hero-graphic-blog-home',
      },
    },
  },
  {
    path: 'blog/:category',
    loadComponent: () =>
      import('./pages/blog/blog-category/blog-category.component').then(
        (m) => m.BlogCategoryComponent
      ),
    data: {
      hero: {
        title: '',
        subtitle: '',
        heroText: '',
        styleClass: 'hero-graphic-blog-categories',
      },
    },
  },
  {
    path: 'blog/:category/:id/:slug',
    loadComponent: () =>
      import('./pages/blog/blog-post/blog-post.component').then(
        (m) => m.BlogPostComponent
      ),
    data: {
      hero: {
        title: '',
        subtitle: '',
        heroText: '',
        styleClass: 'hero-graphic-blog-post',
      },
    },
  },
  {
    path: 'thank-you',
    loadComponent: () =>
      import('./pages/thank-you/thank-you.component').then(
        (m) => m.ThankYouComponent
      ),
    data: {
      hero: {
        title: '',
        subtitle: '',
        heroText: '',
        styleClass: 'thank-you',
      },
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      hero: {
        title: '',
        subtitle: '',
        heroText: '',
        styleClass: '',
      },
    },
  },
];
