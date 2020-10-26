import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [AddEditComponent, ListComponent],
  imports: [
    CommonModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
