
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LocationService } from '@core/services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@core/models';
import { MatSort } from '@angular/material/sort';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['', '', '', ''];
  dataSource: MatTableDataSource<Location>;
  //locations: LocationSearchResult[] | any[];
  data: Location[] | any[] = [];
  selected: string;

  locations: any[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
      this.locationService.getAll()
      .pipe(first())
      .subscribe(locations => {
        this.locations = locations;
        console.log(this.locations);
      })
    }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
