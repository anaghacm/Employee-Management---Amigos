import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hr-navbar',
  templateUrl: './hr-navbar.component.html',
  styleUrls: ['./hr-navbar.component.scss']
})
export class HrNavbarComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }


  logout(){
    localStorage.clear();
    this._router.navigateByUrl('');
  }
}
