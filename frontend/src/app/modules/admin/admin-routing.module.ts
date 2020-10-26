import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OverviewComponent } from './overview';

const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);
const projectsModule = () => import('./projects/projects.module').then(x => x.ProjectsModule);
const notesModule = () => import('./notes/notes.module').then(x => x.NotesModule);

const routes: Routes = [
            { path: '', component: OverviewComponent },
            { path: 'accounts', loadChildren: accountsModule },
            { path: 'projects', loadChildren: projectsModule },
            { path: 'notes', loadChildren: notesModule }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }