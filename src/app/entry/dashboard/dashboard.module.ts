import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardMaterialModule } from '../../common/core/module/material/dashboard-material.module';

import { DashboardComponent } from './dashboard.component';
import { GenerateComponent } from './generate/generate.component';
import { RegisterComponent } from './register/register.component';
import { JoinComponent } from './join/join.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClipboardModule,
    DashboardRoutingModule,
    DashboardMaterialModule
  ],
  declarations: [
    DashboardComponent,
    GenerateComponent,
    RegisterComponent,
    JoinComponent,
    ListComponent
  ]
})
export class DashboardModule { }
