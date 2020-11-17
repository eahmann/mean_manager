import { EnumToArrayPipe1 } from '@core/pipes/enum-to-array.pipe';
import { MaterialModule } from '@shared/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { LocationsRoutingModule } from './locations-routing.module';
import { ListComponent } from './list';
import { AddEditComponent } from './add-edit';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    LocationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxDatatableModule
  ],
  declarations: [
    ListComponent,
    AddEditComponent,
    EnumToArrayPipe1
]
})
export class LocationsModule { }
