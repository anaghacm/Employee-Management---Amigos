import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendId'
})
export class AppendIdPipe implements PipeTransform {

  transform(data:any) {
    //Leave details as input - contains the field employeeid
    if(data.employeeid){
      if(data.employeeid<10){
        data.employeeid='AMG - 00'+data.employeeid.toString();
      }
      else if(data.employeeid>=10){
        data.employeeid='AMG - 0'+data.employeeid.toString();
      }
    }
    //Employee details as input --- contains the field id
    else{
      if(data.id<10){
        data.empid='AMG - 00'+data.id.toString();
      }
      else if(data.id>=10){
        data.empid='AMG - 0'+data.id.toString();
      }
    }
    return data;
  }

}
