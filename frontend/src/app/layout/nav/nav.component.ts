import { Account, Role, MenuItem } from '@core/models';
import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AccountService, NavigateService } from '@core/services';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @ViewChild('drawer') drawer: MatSidenav;
  account: Account;
  Role = Role;
  panelOpenState = false;

  menuItems: MenuItem[] = [
    {
      label: 'My Account',
      icon: 'settings',
      path: '/profile'
    },
    {
      label: 'Logout',
      icon: 'power_settings_new',
      path: '/account/logout'
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private accountService: AccountService,
    private _navigate: NavigateService) {
    this.accountService.account.subscribe(x => this.account = x);
}

clickHandler(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.drawer.close();
        }
      });
  }

logout(): void {
    this.accountService.logout();
}

navigate(path: string): void{
  this._navigate.go(path);
}

}
