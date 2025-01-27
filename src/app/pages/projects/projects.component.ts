import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProjectsService } from '../../shared/services/projects.service';
import { CardComponent } from '../../components/card/card.component';
import { CodeImage } from '../../models/code-image.interface';

@Component({
  selector: 'app-projects',
  imports: [CardComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  standalone: true,
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  // @Input() title: string = '';
  // @Input() description: string = '';
  // @Input() codeImage: CodeImage = {};
  // @Input() tags: string[] = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projectsService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }
}
