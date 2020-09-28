import { Component, OnInit } from '@angular/core';
import { AccountService } from '@core/services';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
      this.accountService.logout();
  }

}

