import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestComponent implements OnInit, OnChanges {

  @Input() editEmployee!: any;
  public requestArray:any=[];

  constructor(private _api:ApiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editEmployee'].currentValue != undefined) {
      
      for(let request of this.editEmployee.leavedetails){
        
        if(request.status == 'Pending'){
          this.requestArray.push(request)
        }
      }
    }
  }

  respondRequest(requestId:number, status:string){
    let response={
      id:requestId,
      status:status
    }
    this._api.respondLeaveRequest(response).subscribe((response)=>{

    })
  }
  
}
