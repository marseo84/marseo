import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projectsUrl = 'assets/data/projects.json';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.projectsUrl);
  }

  getFeaturedProjects(): Observable<any[]> {
    return this.getProjects().pipe(
      map((projects) => projects.filter((project) => project.featured))
    );
  }

  getProjectDetails(id: number): Observable<any> {
    return this.getProjects().pipe(
      map((projects) => projects.find((project) => project.id === id))
    );
  }
}
