import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-emp-academic-data',
  templateUrl: './emp-academic-data.component.html',
  styleUrls: ['./emp-academic-data.component.scss']
})
export class EmpAcademicDataComponent implements OnInit {

  faEdit = faEdit;
  public currentUser!: any;
  public userInfo: any;
  public academicDataForm!: FormGroup;

  constructor(private _api: ApiService, private _fb: FormBuilder, private _snackBar: MatSnackBar) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    this.getEmployeeById();
  }

  ngOnInit(): void {
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployeeById();
    })

    this.academicDataForm = this._fb.group({
      qualification: ['', Validators.required],
      course: ['', Validators.required],
      university: ['', Validators.required],
      percentage: ['', Validators.required]
    })
  }


  getEmployeeById() {
    this._api.getEmployeeById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
      this.displayResult()
    })
  }
  displayResult() {
    this.academicDataForm.get('qualification')?.setValue(this.userInfo.qualification);
    this.academicDataForm.get('course')?.setValue(this.userInfo.course);
    this.academicDataForm.get('university')?.setValue(this.userInfo.university);
    this.academicDataForm.get('percentage')?.setValue(this.userInfo.percentage);
    this.academicDataForm.disable();
    document.getElementById('btnacademic')?.style.setProperty("display", "none");
  }

  editForm() {
    this.academicDataForm.enable();
    document.getElementById('btnacademic')?.style.setProperty("display", "block");
  }
  saveDetails() {
    let userDetails = {
      id: this.userInfo.id,
      qualification: this.academicDataForm.value.qualification,
      course: this.academicDataForm.value.course,
      university: this.academicDataForm.value.university,
      percentage: this.academicDataForm.value.percentage
      
    }
    this._api.updatePersonalInfo(userDetails).subscribe((response) => {
      this._snackBar.open("Updated successfully", "", {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
    })
    this.academicDataForm.disable()
    document.getElementById('btnacademic')?.style.setProperty("display", "none")
  }
}

