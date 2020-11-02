import { Component, OnInit } from '@angular/core';
import { LocationService } from '@core/services';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  //dataSource: MatTableDataSource<Project>;
  projects: any[];

  constructor(
    private locationService: LocationService
    ) { }

  ngOnInit(): void {
    this.locationService.getAll()
    .pipe(first())
    .subscribe(projects => {
      this.projects = projects;
      console.log(this.projects);
    })


  }


}
