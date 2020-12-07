import { LocationService } from '@core/services';


import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';
import { Location, LocationSearchResult } from '@core/models';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['project', 'id', 'address', 'city', 'state', 'zip', 'onsite', 'actions'];
  dataSource: MatTableDataSource<Account>;
  locations: LocationSearchResult[] | any[];
  address: string[] = ['address', 'city', 'zipCode'];
  isLoadingResults = true;
  isLoadingMap = true;
  

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private locationService: LocationService,
    public dialog: MatDialog
    ) {
    console.log(this.dataSource);
}
  ngOnInit(): void {
    this.locationService.getAll()
        .pipe(first())
        .subscribe(locations => {
          this.isLoadingResults = false;
          this.locations = locations;
          console.log(this.locations);
          this.dataSource = new MatTableDataSource(this.locations);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openMapDialog(addressLine1: string, city: string, state: string, zipCode: number) {
    const navInput = `${addressLine1} ${city} ${state} ${zipCode}`;

    console.log(navInput);
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: '70vw',
      maxHeight: '90vh',
      data: ( navInput || '')})
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.isLoadingMap = false;
  }
}
