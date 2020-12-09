import { MaterialModule } from '@shared/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewComponent } from './view/view.component';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  declarations: [ListComponent, AddEditComponent, ViewComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    GoogleMapsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC8yZHv0yb9MgJWYMuMsNF4BEzxA9vSswA'
    })
  ]
})
export class ProjectsModule { }