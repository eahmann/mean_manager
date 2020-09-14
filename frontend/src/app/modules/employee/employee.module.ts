import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { MaterialModule } from '@shared/material';


@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule
  ]
})
export class EmployeeModule { }
