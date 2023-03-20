import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { EmpNavbarComponent } from './emp-navbar/emp-navbar.component';
import { EmpDashboardComponent } from './emp-dashboard/emp-dashboard.component';
import { EmpLeaveapplyComponent } from './emp-leaveapply/emp-leaveapply.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpPersonalDataComponent } from './emp-personal-data/emp-personal-data.component';
import { EmpAcademicDataComponent } from './emp-academic-data/emp-academic-data.component';
import { EmpLeaveDataComponent } from './emp-leave-data/emp-leave-data.component';
import { EmpFooterComponent } from './emp-footer/emp-footer.component';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    EmpHomeComponent,
    EmpNavbarComponent,
    EmpDashboardComponent,
    EmpLeaveapplyComponent,
    EmpPersonalDataComponent,
    EmpAcademicDataComponent,
    EmpLeaveDataComponent,
    EmpFooterComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatMenuModule
  ]
})
export class EmployeeModule { }
