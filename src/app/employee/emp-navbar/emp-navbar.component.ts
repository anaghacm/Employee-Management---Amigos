import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-emp-navbar',
  templateUrl: './emp-navbar.component.html',
  styleUrls: ['./emp-navbar.component.scss']
})
export class EmpNavbarComponent implements OnInit, OnDestroy {

  faAngleDown = faAngleDown;
  faUserLock = faUserLock;

  public currentUser!: any;
  public userInfo: any = {
    image: ''
  };

  constructor(private _router: Router, private _api: ApiService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    this.getEmployeeById();
  }
  ngOnDestroy(): void {
    localStorage.clear();
      let user={
        id:this.currentUser.id,
        active:0
      }
      this._api.makeActive(user).subscribe((response)=>{})
  }

  ngOnInit(): void {
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployeeById();
    })
  }


  getEmployeeById() {
    this._api.getEmployeeById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
    })
  }
  logout() {
   
    this._router.navigateByUrl('');
  }

}
