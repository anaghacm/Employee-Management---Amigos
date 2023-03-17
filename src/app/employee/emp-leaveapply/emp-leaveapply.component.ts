import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { faCheckCircle, faExclamationCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-emp-leaveapply',
  templateUrl: './emp-leaveapply.component.html',
  styleUrls: ['./emp-leaveapply.component.scss']
})
export class EmpLeaveapplyComponent implements OnInit {

  faCheckCircle=faCheckCircle;
  faExclamationCircle=faExclamationCircle;
  faQuestionCircle=faQuestionCircle;

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
