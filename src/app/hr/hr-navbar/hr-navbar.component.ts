import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown, faUserLock, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { navbarData } from './nav-data';

interface sideNavToggle {
  screenWidth : number,
  collapsed : boolean
}
@Component({
  selector: 'app-hr-navbar',
  templateUrl: './hr-navbar.component.html',
  styleUrls: ['./hr-navbar.component.scss']
})
export class HrNavbarComponent implements OnInit, OnDestroy {

  collapsed=true;
  navData = navbarData;
  screenWidth =0;
  @Output() onToggleSideNav: EventEmitter<sideNavToggle> = new EventEmitter();

  faAngleDown=faAngleDown;
  faUserLock=faUserLock;
  faUser=faUser;
  faSignOutAlt=faSignOutAlt;

  public currentUser!: any;
  public userInfo: any={
    image:''
  };

  constructor(private _router:Router, private _api: ApiService) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    this.getEmployeeById();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.screenWidth=window.innerWidth;
    if(this.screenWidth<=768){
      this.collapsed=false;
      this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
    }
  }
  ngOnInit(): void {
    this.screenWidth=window.innerWidth;

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
 
  toggleCollapse(){
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
  }
  closeSideNav(){
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed:this.collapsed, screenWidth:this.screenWidth})
  }
  
}
