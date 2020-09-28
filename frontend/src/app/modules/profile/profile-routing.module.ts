import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DetailsComponent } from './details';
import { UpdateComponent } from './update';

const routes: Routes = [
            { path: '', component: DetailsComponent },
            { path: 'update', component: UpdateComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
