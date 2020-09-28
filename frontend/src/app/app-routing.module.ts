import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { AuthGuard } from '@core/helpers';
import { Role } from '@core/models';
import { NavComponent, LandingComponent } from './layout';

const accountModule = () => import('@modules/account/account.module').then(x => x.AccountModule);
const adminModule = () => import('@modules/admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('@modules/profile/profile.module').then(x => x.ProfileModule);

const routes: Routes = [
    {
      path: '',
      component: NavComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'profile', loadChildren: profileModule},
        { path: '', loadChildren: adminModule, data: { roles: [Role.Admin] } },
      ]
    },
    {
      path: '',
      component: LandingComponent,
      children: [
        { path: 'account', loadChildren: accountModule },
      ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
