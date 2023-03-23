import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivateConfirmComponent } from '../can-deactivate-confirm/can-deactivate-confirm.component';
import { EmpDashboardComponent } from '../employee/emp-dashboard/emp-dashboard.component';
import { HrDashboardComponent } from '../hr/hr-dashboard/hr-dashboard.component';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuardService implements CanDeactivate<HrDashboardComponent | EmpDashboardComponent>{

  constructor(private _dialog: MatDialog, private _api:ApiService) { }

  canDeactivate(component: HrDashboardComponent | EmpDashboardComponent): Observable<boolean> {
    // return confirm("Are you sure you want to logout?");
    // let currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    let dialogRef = this._dialog.open(CanDeactivateConfirmComponent)
    return dialogRef.afterClosed();
  }
}
