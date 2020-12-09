import { ProjectService } from '@core/services';


import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { Project } from '@core/models';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'active', 'actions'];
  dataSource: MatTableDataSource<Project>;
  projects: any[];
  isLoadingResults = true;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private projectService: ProjectService
    ) {
    console.log(this.dataSource);
}

  ngOnInit(): void {
    this.projectService.getAll()
        .pipe(first())
        .subscribe(projects => {
          this.isLoadingResults = false;
          this.projects = projects;
          console.log(this.projects);
          this.dataSource = new MatTableDataSource(this.projects);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
