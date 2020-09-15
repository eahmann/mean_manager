import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule
    ],
    declarations: [
        OverviewComponent
    ]
})
export class AdminModule { }
