import { MaterialModule } from '@shared/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps'

import { LocationsRoutingModule } from './locations-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MaterialModule,
    GoogleMapsModule,
  ]
})
export class LocationsModule { }