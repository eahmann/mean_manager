import {  } from './../models/accountSearchResults';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Account, AccountSearchResult, Page } from '@core/models';

const baseUrl = `${environment.apiUrl}/accounts`;

@Injectable({ providedIn: 'root' })
export class AccountService {
    private accountSubject: BehaviorSubject<Account>;
    public account: Observable<Account>;
    private refreshTokenTimeout;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.accountSubject = new BehaviorSubject<Account>(null);
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account {
        return this.accountSubject.value;
    }

    login(email: string, password: string): Observable<Account> {
        return this.http.post<any>(`${baseUrl}/authenticate`, { email, password }, { withCredentials: true })
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    logout(): void {
        this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    refreshToken(): Observable<Account> {
        return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
            .pipe(map((account) => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    register(account: Account): Observable<any> {
        return this.http.post(`${baseUrl}/register`, account);
    }

    verifyEmail(token: string): Observable<any> {
        return this.http.post(`${baseUrl}/verify-email`, { token });
    }

    forgotPassword(email: string): Observable<any> {
        return this.http.post(`${baseUrl}/forgot-password`, { email });
    }

    validateResetToken(token: string): Observable<any> {
        return this.http.post(`${baseUrl}/validate-reset-token`, { token });
    }

    resetPassword(token: string, password: string, confirmPassword: string): Observable<any> {
        return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
    }

    getAll(): Observable<Account[]> {
        return this.http.get<Account[]>(baseUrl);
    }

    search(filter = '', sort = '', order = 'asc', pageNumber = 1, pageSize = 3): Observable<AccountSearchResult> {
        const payload = 'payload';
        return this.http.get<AccountSearchResult>(`${baseUrl}/search`, {
            params: new HttpParams()
                .set('filter', filter)
                .set('sort', sort)
                .set('order', order)
                .set('page', pageNumber.toString())
                .set('amount', pageSize.toString())
        });
    }

    // search2(page: Page): Observable<AccountSearchResult> {
    //     const payload = 'payload';
    //     return this.http.get<AccountSearchResult>(`${baseUrl}/search`, {
    //         params: new HttpParams()
    //             .set('filter', '')
    //             .set('sort', page.)
    //             .set('order', order)
    //             .set('page', pageNumber.toString())
    //             .set('amount', pageSize.toString())
    //     });
    // }

    getById(id: string): Observable<Account> {
        return this.http.get<Account>(`${baseUrl}/${id}`);
    }

    create(params): Observable<any> {
        return this.http.post(baseUrl, params);
    }

    update(id, params): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((account: any) => {
                // update the current account if it was updated
                if (account.id === this.accountValue.id) {
                    // publish updated account to subscribers
                    account = { ...this.accountValue, ...account };
                    this.accountSubject.next(account);
                }
                return account;
            }));
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
                // auto logout if the logged in account was deleted
                if (id === this.accountValue.id) {
                    this.logout();
                }
            }));
    }

    // helper methods

    private startRefreshTokenTimer(): void {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer(): void {
        clearTimeout(this.refreshTokenTimeout);
    }
}
