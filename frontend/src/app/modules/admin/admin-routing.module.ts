import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview';

const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const projectsModule = () => import('./projects/projects.module').then(x => x.ProjectsModule);
const locationsModule = () => import('./locations/locations.module').then(x => x.LocationsModule);


const routes: Routes = [
            { path: '', component: OverviewComponent },
            { path: 'accounts', loadChildren: accountsModule },
            { path: 'projects', loadChildren: projectsModule },
            { path: 'locations', loadChildren: locationsModule }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }