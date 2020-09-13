import { Component } from '@angular/core';

import { AccountService } from '@core/services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    account = this.accountService.accountValue;

    constructor(private accountService: AccountService) { }
}