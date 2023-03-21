import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _refreshRequired = new Subject<void>();

  constructor(private _http: HttpClient) { }

  get RefreshRequired() {
    return this._refreshRequired;
  }
  getUsers(username:string) {
    return this._http.get('http://localhost:3000/users/?username='+username);
  }

  resetPassword(userDetails: any) {
    return this._http.patch('http://localhost:3000/users/' + userDetails.id, userDetails);
  }

  getAllUsers(){
    return this._http.get('http://localhost:3000/users');
  }
  getEmployees() {
    return this._http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id: number) {
    return this._http.delete('http://localhost:3000/employees/' + id);
  }

  addEmployee(userDetails: any) {
    return this._http.post('http://localhost:3000/employees', userDetails)
  }

  editEmployee(userDetails: any) {
    return this._http.put('http://localhost:3000/employees/' + userDetails.id, userDetails).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }

  updatePersonalInfo(userDetails: any) {
    return this._http.patch('http://localhost:3000/employees/' + userDetails.id, userDetails).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }
  leaveRequest(userDetails:any){
    return this._http.post('http://localhost:3000/leavedetails', userDetails);
  }
  updateProfilePic(userDetails:any){
    return this._http.patch('http://localhost:3000/employees/' + userDetails.id, userDetails).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }
  getEmployeeById(id: number) {
    return this._http.get('http://localhost:3000/employees/' + id);
  }
  getLeaveDetailsById(id:number){
    return this._http.get('http://localhost:3000/leavedetails/?employeeid=' + id);
  }
  respondLeaveRequest(response:any){
    return this._http.patch('http://localhost:3000/leavedetails/'+response.id, response).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }

  getLastWeekLeaveDetails(){
    return this._http.get('http://localhost:3000/leavedetails/?status=Approved');
  }
}
