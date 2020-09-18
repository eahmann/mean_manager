

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '@core/models';
import { AccountService } from '@core/services';
import { merge, of as observableOf } from 'rxjs';
import { catchError, first, map, startWith, switchMap } from 'rxjs/operators';




@Component({ templateUrl: 'list.component.html',
styleUrls: ['./list.component.scss'] })
export class ListComponent implements AfterViewInit {

    displayedColumns: string[] = ['id', 'firstName', 'email', 'role', 'actionsColumn'];
    dataSource: MatTableDataSource<Account>;
    accounts: any[];

    resultsLength = 0;
    isLoadingResults = false;
    isRateLimitReached = false;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(
        private accountService: AccountService
        ) {
    }

    // ngOnInit(): void {
    //     this.accountService.getAll()
    //         .pipe(first())
    //         .subscribe(accounts => {
    //             this.accounts = accounts;
    //             console.log(this.accounts);
    //             this.dataSource = new MatTableDataSource(this.accounts);
    //             this.dataSource.sort = this.sort;
    //         }
    //             );
    // }

    ngAfterViewInit() {
    
        // If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    
        merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.accountService.search(
                this.sort.active, this.sort.direction, this.paginator.pageIndex);
            }),
            map(accounts => {
              // Flip flag to show that loading has finished.
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
             // this.resultsLength = data.total_countd;
    
              return accounts;
            }),
            catchError(() => {
              this.isLoadingResults = false;
              // Catch if the GitHub API has reached its rate limit. Return empty data.
              this.isRateLimitReached = true;
              return observableOf([]);
            })
          ).subscribe(accounts => this.dataSource.data = accounts);
      }
    
    


    deleteAccount(id: string): void {
        const account = this.accounts.find(x => x.id === id);
        account.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.accounts = this.accounts.filter(x => x.id !== id);
            });
    }
}

// import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
// import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
// import { merge, fromEvent } from 'rxjs';
// import { AccountDataSource } from '@core/services';
// import { AccountService } from '@core/services';


// @Component({
//     selector: 'app-admin-accounts-list',
//     templateUrl: 'list.component.html',
//     styleUrls: ['./list.component.scss']
// })
//  export class ListComponent implements OnInit, AfterViewInit {

//     displayedColumns: string[] = ['id', 'firstName', 'email', 'role', 'actionsColumn'];
//     // displayedColumns= ["seqNo", "description", "duration"];

//     accounts: any[];
//     // course:Course;

//     dataSource: AccountDataSource;
//      // dataSource: MatTableDataSource<Account>;

//     @ViewChild(MatPaginator) paginator: MatPaginator;

//     @ViewChild(MatSort) sort: MatSort;

//     @ViewChild('input') input: ElementRef;

//     constructor(private route: ActivatedRoute,
//                 private accountService: AccountService) {

// }
//     // constructor(private route: ActivatedRoute,
//     //             private coursesService: CoursesService) {

//     // }

//     ngOnInit(): void {

//         // this.course = this.route.snapshot.data["course"];
//         this.accounts = this.route.snapshot.data['accounts'];
//         console.log(this.accounts)

//         this.dataSource = new AccountDataSource(this.accountService);
//         // this.dataSource = new LessonsDataSource(this.coursesService);

//         this.dataSource.loadAccounts('', 'asc', 1, 3);
//         console.log(this.dataSource)
//     }

//     ngAfterViewInit(): void {
//         this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 1);
//         fromEvent(this.input.nativeElement, 'keyup')
//             .pipe(
//                 debounceTime(150),
//                 distinctUntilChanged(),
//                 tap(() => {
//                     this.paginator.pageIndex = 1;
//                     this.loadAccountsPage();
//                 })
//             )
//             .subscribe();

//         merge(this.sort.sortChange, this.paginator.page)
//         .pipe(
//             tap(() => this.loadAccountsPage())
//         )
//         .subscribe();
//         console.log(this.dataSource)
//     }

//     loadAccountsPage(): void {
//         this.dataSource.loadAccounts(
//             this.input.nativeElement.value,
//             this.sort.direction,
//             this.paginator.pageIndex,
//             this.paginator.pageSize);
//     }


// }