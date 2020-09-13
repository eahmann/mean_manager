import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@core/services';
import { Account } from '@core/models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    accounts: any[];

    constructor(private accountService: AccountService) {}

    ngOnInit(): void {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts);
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
