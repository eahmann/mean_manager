import { EnumToArrayPipe } from '@core/pipes/enum-to-array.pipe';
import { MaterialModule } from '@shared/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { AccountsRoutingModule } from './accounts-routing.module';
import { ListComponent } from './list';
import { AddEditComponent } from './add-edit';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AccountsRoutingModule,
        MaterialModule,
        NgxDatatableModule
    ],
    declarations: [
        ListComponent,
        AddEditComponent,
        EnumToArrayPipe
    ]
})
export class AccountsModule { }