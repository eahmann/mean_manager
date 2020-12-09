import { MaterialModule } from '@shared/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule
  ]
})
export class ProjectsModule { }