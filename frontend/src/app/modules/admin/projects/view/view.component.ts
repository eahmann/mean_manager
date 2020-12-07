import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '@core/models';
import { ProjectService } from '@core/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  project: Project;
  loading = false;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.projectService.getById(params.id)
      .pipe(first())
      .subscribe(project => {
        this.project = project;
        this.loading = false;
        console.log(this.project);
      });
  });
  }

}
