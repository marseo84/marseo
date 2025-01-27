import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectsService } from '../../shared/services/projects.service';
import { CommonModule } from '@angular/common';
import { SwiperSliderComponent } from '../swiper-slider/swiper-slider.component';
import { CodeSnippetsComponent } from '../code-snippets/code-snippets.component';

@Component({
  selector: 'app-project-details',
  imports: [
    CommonModule,
    RouterModule,
    SwiperSliderComponent,
    CodeSnippetsComponent,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
  standalone: true,
})
export class ProjectDetailsComponent implements OnInit {
  projectId: number | null = null;
  project: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    // get the project id from the route and convert it to a number, get the slug
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const slug = params['slug'];
      this.projectId = id ? +id : null;

      if (this.projectId !== null) {
        this.projectsService
          .getProjectDetails(this.projectId)
          .subscribe((data) => {
            this.project = data;

            if (this.project && this.project.slug !== slug) {
              this.router.navigate([
                '/projects',
                this.project.id,
                this.project.slug,
              ]);
            }
          });
      }
    });
    // const id = this.route.snapshot.paramMap.get('id');
    // const slug = this.route.snapshot.paramMap.get('slug');
    // this.projectId = id ? +id : null;

    // console.log('Project ID:', this.projectId);

    // fetch project details
    // if (this.projectId !== null) {
    //   this.projectsService
    //     .getProjectDetails(this.projectId)
    //     .subscribe((data) => {
    //       this.project = data;
    //       console.log('Project Details:', this.project);

    //       // check if the slug matches, redirect if necessary
    //       if (this.project && this.project.slug !== slug) {
    //         this.router.navigate([
    //           '/projects',
    //           this.project.id,
    //           this.project.slug,
    //         ]);
    //       }
    //     });
  }
}
// }
