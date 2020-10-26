import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list';
import { AddEditComponent } from './add-edit';

const routes: Routes = [
    { path: 'list' , redirectTo: 'list/', pathMatch: 'full'},
    { path: 'list/:type', component: ListComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }