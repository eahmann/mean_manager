import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapInfo, Project } from '@core/models';
import { MapService, ProjectService } from '@core/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  project: Project;
  loading = false;
  deleting = false;
  mapInfo: MapInfo;
  id: string;

  constructor(private projectService: ProjectService,
              private route: ActivatedRoute,
              private router: Router,
              private mapService: MapService) { }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.projectService.getById(params.id)
        .pipe(first())
        .subscribe(project => {
          this.project = project;
          this.loading = false;
          // updaconsole.log(this.project);
          // this.mapService.getLatLngFromAddress(this.project.location.addressLine1 + this.project.location.zipCode)
          //   .pipe(first())
          //   .subscribe(res => {
          //     console.log(res);
          //     console.log(this.mapInfo);
          //     this.mapInfo.lat = (res as any).results[0].geometry.location.lat;
          //     this.mapInfo.lng = (res as any).results[0].geometry.location.lng;
          //   });
        });
    });

  }

  onDelete() {
    this.deleting = true;
    this.projectService.delete(this.id)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }

}
