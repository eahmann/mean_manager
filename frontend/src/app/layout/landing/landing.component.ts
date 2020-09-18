import { NavigateService } from '@core/services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from '@core/models';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      label: 'Register',
      icon: 'person_add',
      path: '/account/register'
    },
    {
      label: 'Login',
      icon: 'lock_open',
      path: '/account/login'
    },
    {
      label: 'Forgot passowrd',
      icon: 'help_outline',
      path: '/account/forgot-password'
    },
  ];

  constructor(private _navigate: NavigateService) { }

  ngOnInit(): void {
  }

  navigate(path: string): void{
    this._navigate.go(path);
  }

}
