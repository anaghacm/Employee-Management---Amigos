import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit, OnChanges {

  public createEmployeeForm !: FormGroup;
  @Input() editEmployee!: any;
  public fileName: string = 'No files uploaded';
  public editId!: number;

  constructor(private _fb: FormBuilder, private _api: ApiService) {
  }

  ngOnInit(): void {
    this.createEmployeeForm = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      bloodgroup: ['select', Validators.required],
      email: ['', Validators.required],
      gender: ['male', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      profilepic: ['', Validators.required],
      qualification: ['', Validators.required],
      subject: ['', Validators.required],
      university: ['', Validators.required],
      percentage: ['', Validators.required],
      department: ['select', Validators.required],
      designation: ['', Validators.required],
      fbid: ['', Validators.required],
      instaid: ['', Validators.required],
      linkedinid: ['', Validators.required]
    })

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['editEmployee'].currentValue != undefined) {
      const [day, month, year] = this.editEmployee.dob.split('/');
      this.createEmployeeForm.get('firstname')?.setValue(this.editEmployee.name);
      this.createEmployeeForm.get('age')?.setValue(this.editEmployee.age);
      this.createEmployeeForm.get('dob')?.setValue(year + '-' + month + '-' + day);
      this.createEmployeeForm.get('bloodgroup')?.setValue(this.editEmployee.bloodgroup);
      this.createEmployeeForm.get('gender')?.setValue(this.editEmployee.gender);
      this.createEmployeeForm.get('email')?.setValue(this.editEmployee.email);
      this.createEmployeeForm.get('contact')?.setValue(this.editEmployee.contact);
      this.createEmployeeForm.get('department')?.setValue(this.editEmployee.department);
      this.createEmployeeForm.get('designation')?.setValue(this.editEmployee.designation);
      this.createEmployeeForm.get('address')?.setValue(this.editEmployee.address);
      this.createEmployeeForm.get('fbid')?.setValue(this.editEmployee.fb);
      this.createEmployeeForm.get('instaid')?.setValue(this.editEmployee.insta);
      this.createEmployeeForm.get('linkedinid')?.setValue(this.editEmployee.linkedin);
      this.fileName = this.editEmployee.image;
      this.editId = this.editEmployee.id;
    }
  }
  setFileName(event: any) {
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    }
  }
  saveEmpDetails() {
    if(this.editId){
      const [year, month, day] = this.createEmployeeForm.value.dob.split('-');
      let userInfo = {
        id: this.editId,
        name: this.createEmployeeForm.value.firstname,
        age: this.createEmployeeForm.value.age,
        dob: day + '/' + month + '/' + year,
        image: this.fileName,
        bloodgroup: this.createEmployeeForm.value.bloodgroup,
        gender: this.createEmployeeForm.value.gender,
        email: this.createEmployeeForm.value.email,
        contact: this.createEmployeeForm.value.contact,
        address: this.createEmployeeForm.value.address,
        department: this.createEmployeeForm.value.department,
        designation: this.createEmployeeForm.value.designation,
        active: 0,
        fb: this.createEmployeeForm.value.fbid,
        insta: this.createEmployeeForm.value.instaid,
        linkedin: this.createEmployeeForm.value.linkedinid
      }
      this._api.editEmployee(userInfo).subscribe((response) => {
      })
    }
    else{
      console.log("no data entered")
    }
  }
}
