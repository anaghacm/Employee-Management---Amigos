import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-navbar',
  templateUrl: './emp-navbar.component.html',
  styleUrls: ['./emp-navbar.component.scss']
})
export class EmpNavbarComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }


  logout(){
    localStorage.clear();
    this._router.navigateByUrl('');
  }

}
