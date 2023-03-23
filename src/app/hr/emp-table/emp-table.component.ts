import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AppendIdPipe } from 'src/app/services/append-id.pipe';

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.scss']
})
export class EmpTableComponent implements OnInit {

  public employeeList:any
  constructor(private _api:ApiService, private _appendid:AppendIdPipe) { 
    this.getEmployees();
  }

  ngOnInit(): void {
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployees();
    })
  }

  getEmployees(){
    this._api.getEmployees().subscribe((response)=>{
      this.employeeList=response
      for(let employee of this.employeeList){
        this._appendid.transform(employee)
      }
    })
  }
}
