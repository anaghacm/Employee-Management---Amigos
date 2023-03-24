import { Component, OnInit } from '@angular/core';

interface sideNavToggle {
  screenWidth: number,
  collapsed: boolean
}
@Component({
  selector: 'app-hr-dashboard',
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit {

  isSideNavCollapsed = false;
  screenWidth = 0;
  constructor() { }

  ngOnInit(): void {
  }
  onToggleSideNav(data: sideNavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  getBodyClass() {
    let styleClass = '';
    if (this.isSideNavCollapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed'
    }
    else if (this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen';
    }
   
    else if (!this.isSideNavCollapsed && this.screenWidth > 768) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
