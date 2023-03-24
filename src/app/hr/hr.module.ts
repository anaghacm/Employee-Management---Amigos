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
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFormComponent } from './create-form/create-form.component';
import { HrFooterComponent } from './hr-footer/hr-footer.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { D3ServiceService } from './hr-services/d3-service.service';
import { MatMenuModule } from '@angular/material/menu';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { EmpTableComponent } from './emp-table/emp-table.component';
import { HrProfileComponent } from './hr-profile/hr-profile.component';
import {MatIconModule} from '@angular/material/icon';

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
    HrFooterComponent,
    LeaveRequestComponent,
    BarChartComponent,
    GaugeChartComponent,
    EmpTableComponent,
    HrProfileComponent,
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    FontAwesomeModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [
    D3ServiceService,
    {
      provide:MAT_DIALOG_DATA, useValue:{}
    }
  ]
})
export class HrModule { }
