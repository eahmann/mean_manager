import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditComponent } from './add-edit';
import { ListComponent } from './list';



const routes: Routes = [
      { path: '', component: ListComponent },
      { path: 'add', component: AddEditComponent},
      {path: 'edit/:id', component: AddEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
