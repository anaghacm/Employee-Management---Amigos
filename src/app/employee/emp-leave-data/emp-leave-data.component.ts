import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-emp-leave-data',
  templateUrl: './emp-leave-data.component.html',
  styleUrls: ['./emp-leave-data.component.scss']
})
export class EmpLeaveDataComponent implements OnInit {

  public currentUser!: any;
  public userInfo: any=[];

  constructor(private _api: ApiService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    this.getLeaveDetailsById();
  }

  ngOnInit(): void {
  }

  getLeaveDetailsById() {
    this._api.getLeaveDetailsById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
    })
  }
}
