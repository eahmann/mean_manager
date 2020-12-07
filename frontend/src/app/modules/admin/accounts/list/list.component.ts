import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Account, AccountSearchResult } from '@core/models';
import { AccountService } from '@core/services';
import { fromEvent, merge, Observable, of as observableOf } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, first, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'firstName', 'email', 'role', 'actions'];
  dataSource: MatTableDataSource<any>;
  accounts: AccountSearchResult[] | any[];
  data: Account[] | any[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  selected: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.isLoadingResults = true;
      this.selected = params.type || 'all';
      this.accountService.getAllByRole(this.selected)
      .pipe(first())
      .subscribe(accounts => {
        this.isLoadingResults = false;
        this.accounts = accounts;
        console.log(this.accounts);
        this.dataSource = new MatTableDataSource(this.accounts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  });

  }
  deleteAccount(id: string): void {
    const account = this.accounts.find(x => x.id === id);
    account.isDeleting = true;
    this.accountService.delete(id)
      .pipe(first())
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(x => x.id !== id);
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
