import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { EmpDashboardComponent } from '../employee/emp-dashboard/emp-dashboard.component';
import { HrDashboardComponent } from '../hr/hr-dashboard/hr-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuardService implements CanDeactivate<HrDashboardComponent | EmpDashboardComponent>{

  constructor() { }

  canDeactivate(component: HrDashboardComponent | EmpDashboardComponent): boolean{
    return confirm("Are you sure you want to logout?");
  }

}
