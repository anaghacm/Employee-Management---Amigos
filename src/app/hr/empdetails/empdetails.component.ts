import { Component, OnInit } from '@angular/core';
import { faUser, faAt, faPhoneAlt, faMapMarked, faEdit, faTrash, faGraduationCap, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-empdetails',
  templateUrl: './empdetails.component.html',
  styleUrls: ['./empdetails.component.scss']
})
export class EmpdetailsComponent implements OnInit {
  faAt = faAt;
  faUser = faUser;
  faPhoneAlt = faPhoneAlt;
  faLocation = faMapMarked;
  faEdit = faEdit;
  faTrash = faTrash;
  faGraduationCap = faGraduationCap;
  faExclamationCircle = faExclamationCircle;
  public employeesList!: any;
  public editEmployee!: any;


  constructor(private _api: ApiService, private _dialog: MatDialog) {
    this.getEmployees();
  }

  ngOnInit(): void {
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployees();
    })

  }

  getEmployees() {
    this._api.getEmployees().subscribe((response) => {
      this.employeesList = response;
      for (let employee of this.employeesList) {
        this._api.getLeaveDetailsById(employee.id).subscribe((response) => {
          employee.leavedetails = response;
          employee.leaveRequestStatus = false;
          if (employee.leavedetails.length > 0) {
            for (let request of employee.leavedetails) {
              if (request.status == 'Pending') {
                employee.leaveRequestStatus = true;

              }
            }
          }
        })
      }
    })

  }
  deleteEmployee(id: number, name: string) {

    let dialogRef = this._dialog.open(ConfirmationDialogComponent)
    dialogRef.afterClosed().subscribe((response) => {
      if (response == "true") {
        this._api.deleteEmployee(id).subscribe((response) => {
          this.getEmployees();
        })
      }

    })
  }

  getDetails(employee: any) {
    this.editEmployee = employee;
  }

}
