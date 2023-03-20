import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-hr-navbar',
  templateUrl: './hr-navbar.component.html',
  styleUrls: ['./hr-navbar.component.scss']
})
export class HrNavbarComponent implements OnInit {

  faAngleDown=faAngleDown;
  faUserLock=faUserLock;

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


  getEmployeeById(){
    this._api.getEmployeeById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
    })
  }
  logout(){
    localStorage.clear();
    this._router.navigateByUrl('');
  }
  
}
