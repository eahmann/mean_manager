import { MaterialModule } from '@shared/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps'
import { LocationsRoutingModule } from './locations-routing.module';
import { ListComponent } from './list/list.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MaterialModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLgf5H2GVr5N4K2SwDd6tzTgPJ_VFvM3E'
    })
  ]
})
export class LocationsModule { }