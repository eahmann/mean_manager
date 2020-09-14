import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { ProjectService } from '@core/services';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: any[];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
      this.projectService.getAll()
          .pipe(first())
          .subscribe(projects => this.projects = projects);
      console.log(this.projects);
  }

  deleteProject(id: string): void {
    const account = this.projects.find(x => x.id === id);
    account.isDeleting = true;
    this.projectService.delete(id)
        .pipe(first())
        .subscribe(() => {
            this.projects = this.projects.filter(x => x.id !== id);
        });
}

}
