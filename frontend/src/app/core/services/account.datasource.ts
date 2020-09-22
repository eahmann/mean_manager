// import { AccountService } from '@core/services';
// import { CollectionViewer, DataSource } from '@angular/cdk/collections';
// import { Observable, BehaviorSubject, of } from 'rxjs';
// import { Account } from '@core/models';
// import { catchError, finalize } from 'rxjs/operators';



// export class AccountDataSource implements DataSource<Account> {
//     private accountsSubject = new BehaviorSubject<Account[]>([]);
//     private loadingSubject = new BehaviorSubject<boolean>(false);
//     public loading$ = this.loadingSubject.asObservable();

//     constructor(private accountService: AccountService) { }

//     loadAccounts(filter: string,
//                  sortDirection: string,
//                  pageIndex: number,
//                  pageSize: number): void {

//         this.loadingSubject.next(true);
//         this.accountService.search(filter, sortDirection,
//             pageIndex, pageSize).pipe(
//                 catchError(() => of([])),
//                 finalize(() => this.loadingSubject.next(false))
//             )
//             .subscribe(accounts => this.accountsSubject.next(accounts));
//     }

//     connect(collectionViewer: CollectionViewer): Observable<Account[]> {
//         console.log('Connecting data source');
//         return this.accountsSubject.asObservable();
//     }

//     disconnect(collectionViewer: CollectionViewer): void {
//         this.accountsSubject.complete();
//         this.loadingSubject.complete();
//     }
// }
