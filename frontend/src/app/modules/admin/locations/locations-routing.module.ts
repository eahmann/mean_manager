import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list';

const routes: Routes = [
  { path: '', component: ListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), GoogleMapsModule],
  exports: [RouterModule]
})
export class LocationsRoutingModule {}