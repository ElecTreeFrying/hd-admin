import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryComponent } from "./entry.component";
import { BufferModule } from './buffer/buffer.module';

const routes: Routes = [
  { path: '', component: EntryComponent, children: [
    { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'p', loadChildren: './buffer/buffer.module#BufferModule' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
