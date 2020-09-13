﻿import { Component } from '@angular/core';

import { AccountService } from '@core/services';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent {
    account = this.accountService.accountValue;

    constructor(private accountService: AccountService) { }
}
