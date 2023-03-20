import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {

  public openMenu:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler(){
    this.openMenu=!this.openMenu
  }
}
