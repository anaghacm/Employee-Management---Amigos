import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrCreateempComponent } from './hr-createemp/hr-createemp.component';
import { HrDashboardComponent } from './hr-dashboard/hr-dashboard.component';
import { HrEmpdetailsComponent } from './hr-empdetails/hr-empdetails.component';
import { HrHomeComponent } from './hr-home/hr-home.component';

const routes: Routes = [
  {
    path:'', component:HrDashboardComponent, children:[
      
      {
        path:'', component:HrHomeComponent
      },
      {
        path:'empdetails', component:HrEmpdetailsComponent
      },
      {
        path:'createemp', component:HrCreateempComponent
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
