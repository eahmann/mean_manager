import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { MaterialModule } from '@shared/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [
        OverviewComponent
    ]
})
export class AdminModule { }
