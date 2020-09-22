import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account, AccountSearchResult } from '@core/models';
import { AccountService } from '@core/services';
import { merge, of as observableOf } from 'rxjs';
import { catchError, first, map, startWith, switchMap, tap } from 'rxjs/operators';




@Component({ templateUrl: 'list.component.html',
styleUrls: ['./list.component.scss'] })
export class ListComponent implements AfterViewInit {

    displayedColumns: string[] = ['id', 'firstName', 'email', 'role', 'actionsColumn'];
    dataSource: MatTableDataSource<any>;
    accounts: AccountSearchResult[] | any[];
    data: Account[] | any[] = [];

    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('input') input: MatInput;
    constructor(
        private accountService: AccountService
        ) {
    }



  ngAfterViewInit(): void {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.accountService.search('', this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);

          // this.exampleDatabase!.getRepoIssues(
          //   this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          console.log('this.resultsLength', this.resultsLength);
          console.log('data', data)

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
      console.log("data",this.data)
  }

  deleteAccount(id: string): void {
      const account = this.data.find(x => x.id === id);
      account.isDeleting = true;
      this.accountService.delete(id)
          .pipe(first())
          .subscribe(() => {
              this.data = this.data.filter(x => x.id !== id);
              this.resultsLength = (this.resultsLength - 1);
          });
  }
}








    // ngOnInit(): void {
    //     this.accountService.search('', '', this.paginator.pageIndex, this.paginator.pageSize)
    //         .pipe(first())
    //         .subscribe(accounts => {
    //             this.accounts = accounts.items;
    //             console.log(this.accounts);
    //             this.dataSource = new MatTableDataSource(this.accounts);
    //             this.dataSource.sort = this.sort;
    //         }
    //             );

    // }


  // ngOnInit(): void {
  //     this.dataSource = new MatTableDataSource(this.accountService.search('', '', this.paginator.pageIndex, this.paginator.pageSize));
  // }


  //  ngAfterViewInit(): void {
  //     this.accountService.search('', '', this.paginator.pageIndex, this.paginator.pageSize)
  //         .pipe(first())
  //         .subscribe(accounts => {
  //             this.accounts = accounts.items;
  //             console.log(this.accounts);
  //             this.dataSource = new MatTableDataSource(this.accounts);
  //             this.dataSource.paginator = this.paginator;
  //             this.dataSource.sort = this.sort;
  //     }
  //         );
  //     this.paginator.page
  //         .pipe(
  //             tap(() => this.loadAccountsPage())
  //         )
  //         .subscribe();
  //      }

  //   loadAccountsPage(): void {
  //     this.accountService.search('', '', this.paginator.pageIndex, this.paginator.pageSize)
  //   }