import { Component, OnInit } from '@angular/core';
import { faUser, faAt, faPhoneAlt, faMapMarked, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public employeesList!: any;
  public editEmployee!:any;

  public viewId!:number;
  public viewName!:string;
  public viewImage!:string;
  public viewAge!:number;
  public viewDob!:string;
  public viewBloodGroup!:string;
  public viewGender!:string;
  public viewEmail!:string;
  public viewContact!:string;
  public viewAddress!:string;
  public viewQualification!:string;
  public viewCourse!:string;
  public viewUniversity!:string;
  public viewPercentage!:number;
  public viewDepartment!:string;
  public viewDesignation!:number;
  public viewFbid!:string;
  public viewInstaid!:string;
  public viewLinkedinid!:string;

  constructor(private _api: ApiService, private _dialog: MatDialog, private _fb: FormBuilder) {
    this.getEmployees();
  }

  ngOnInit(): void {
    this._api.RefreshRequired.subscribe((response)=>{
      this.getEmployees();
    })
   
  }

  getEmployees() {
    this._api.getEmployees().subscribe((response) => {
      this.employeesList = response;
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

  viewDetails(employee:any){
    this.viewId=employee.id;
    this.viewName=employee.firstname+' '+employee.lastname;
    this.viewImage="../../../assets/images/"+employee.image;
    this.viewAge=employee.age;
    this.viewDob=employee.dob;
    this.viewGender=employee.gender;
    this.viewBloodGroup=employee.bloodgroup;
    this.viewEmail=employee.email;
    this.viewContact=employee.contact;
    this.viewAddress=employee.address;
    this.viewDepartment=employee.department;
    this.viewDesignation=employee.designation;
    this.viewQualification=employee.qualification;
    this.viewUniversity=employee.university;
    this.viewPercentage=employee.percentage;
    this.viewCourse=employee.course;
    this.viewFbid=employee.fb;
    this.viewInstaid=employee.insta;
    this.viewLinkedinid=employee.linkedin;
  }
}
