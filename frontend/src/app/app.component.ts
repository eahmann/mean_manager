import { Component } from '@angular/core';

import { AccountService } from '@core/services';
import { Account, Role } from '@core/models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
    Role = Role;
    account: Account;

    constructor(private accountService: AccountService) {
        this.accountService.account.subscribe(x => this.account = x);
    }

    logout(): void {
        this.accountService.logout();
    }
}
