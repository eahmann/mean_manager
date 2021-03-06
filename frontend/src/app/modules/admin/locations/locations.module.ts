import { MaterialModule } from '@shared/material';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps'
import { LocationsRoutingModule } from './locations-routing.module';
import { ListComponent } from './list/list.component';
import { MapDialogComponent } from './map-dialog/map-dialog.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTimepickerModule } from 'mat-timepicker';
import { AddEditComponent } from './add-edit/add-edit.component';


@NgModule({
  declarations: [AddEditComponent, ListComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    LocationsRoutingModule,
    GoogleMapsModule,
    MatTimepickerModule, 
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC8yZHv0yb9MgJWYMuMsNF4BEzxA9vSswA'
    })
  ]
})
export class LocationsModule { }