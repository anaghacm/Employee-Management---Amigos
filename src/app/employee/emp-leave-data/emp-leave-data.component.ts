import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-emp-leave-data',
  templateUrl: './emp-leave-data.component.html',
  styleUrls: ['./emp-leave-data.component.scss']
})
export class EmpLeaveDataComponent implements OnInit {

  public currentUser!: any;
  public userInfo: any={
    leavedetails:[]
  };

  constructor(private _api: ApiService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    this.getEmployeeById();
  }

  ngOnInit(): void {
  }

  getEmployeeById() {
    this._api.getEmployeeById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
    })
  }
}
