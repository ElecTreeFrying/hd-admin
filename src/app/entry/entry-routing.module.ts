import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntryComponent } from "./entry.component";
import { BufferModule } from './buffer/buffer.module';

import { EntryGuard } from '../common/core/service/route-guards';

const routes: Routes = [
  { path: '', component: EntryComponent, canActivateChild: [ EntryGuard ], children: [
    { path: 'u', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'p', loadChildren: './buffer/buffer.module#BufferModule' }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntryRoutingModule { }
