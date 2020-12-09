import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { Routes, RouterModule } from '@angular/router';
import { AddEditComponent } from './add-edit';

import { ListComponent } from './list';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'list' , redirectTo: 'list/', pathMatch: 'full'},
  { path: 'list/:type', component: ListComponent },
  { path: 'add', component: AddEditComponent },
  { path: 'edit/:id', component: AddEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), GoogleMapsModule],
  exports: [RouterModule]
})
export class LocationsRoutingModule {}