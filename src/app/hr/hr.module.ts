import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { HrHomeComponent } from './hr-home/hr-home.component';
import { HrNavbarComponent } from './hr-navbar/hr-navbar.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { HrEmpdetailsComponent } from './hr-empdetails/hr-empdetails.component';
import { HrCreateempComponent } from './hr-createemp/hr-createemp.component';
import { D3DoughnutComponent } from './d3-doughnut/d3-doughnut.component';
import { EmpdetailsComponent } from './empdetails/empdetails.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFormComponent } from './create-form/create-form.component';


@NgModule({
  declarations: [
    HrHomeComponent,
    HrNavbarComponent,
    HrDashboardComponent,
    HrEmpdetailsComponent,
    HrCreateempComponent,
    D3DoughnutComponent,
    EmpdetailsComponent,
    ConfirmationDialogComponent,
    CreateFormComponent,
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    FontAwesomeModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class HrModule { }
