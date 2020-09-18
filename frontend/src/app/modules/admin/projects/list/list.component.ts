import { ProjectService } from '@core/services';


import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { Project } from '@core/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title'];
  dataSource: MatTableDataSource<Account>;
  projects: any[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private projectService: ProjectService
    ) {
    console.log(this.dataSource);
}


  ngOnInit(): void {
    this.projectService.getAll()
        .pipe(first())
        .subscribe(projects => {
            this.projects = projects;
            console.log(this.projects);
            this.dataSource = new MatTableDataSource(this.projects);
            this.dataSource.sort = this.sort;
        }
            );
}
}
