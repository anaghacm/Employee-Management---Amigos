import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faUserLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hr-navbar',
  templateUrl: './hr-navbar.component.html',
  styleUrls: ['./hr-navbar.component.scss']
})
export class HrNavbarComponent implements OnInit, OnDestroy {

  faAngleDown=faAngleDown;
  faUserLock=faUserLock;
  faUser=faUser;

  public currentUser!: any;
  public userInfo: any={
    image:''
  };

  constructor(private _router:Router, private _api: ApiService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    this.getEmployeeById();
  }

  ngOnInit(): void {
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployeeById();
    })
  }

  ngOnDestroy(): void {
    localStorage.clear();
      let user={
        id:this.currentUser.id,
        active:0
      }
      this._api.makeActive(user).subscribe((response)=>{})
  }
  getEmployeeById(){
    this._api.getEmployeeById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
    })
  }
  logout(){
    this._router.navigateByUrl('');
  }
 
  
}
