import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpHomeComponent } from './emp-dashboard/emp-home/emp-home.component';
import { ForgotPasswordComponent } from './homepage/forgot-password/forgot-password.component';
import { HomeComponent } from './homepage/home/home.component';
import { InfoComponent } from './homepage/info/info.component';
import { LoginComponent } from './homepage/login/login.component';
import { HrHomeComponent } from './hr-dashboard/hr-home/hr-home.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path:'', component:HomeComponent, children:[
      {
        path:'', component:InfoComponent
      },
      {
        path:'login', component:LoginComponent
      },
      {
        path:'resetpassword', component:ForgotPasswordComponent
      }
    ]
  },
  {
    path:'emphome', component:EmpHomeComponent
  },
  {
    path:'hrhome', component:HrHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
