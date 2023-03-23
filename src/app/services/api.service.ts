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

  //users Collection
  getUsers(username:string) {
    return this._http.get('http://localhost:3000/users/?username='+username);
  }

  resetPassword(userDetails: any) {
    return this._http.patch('http://localhost:3000/users/' + userDetails.id, userDetails);
  }

  getAllUsers(){
    return this._http.get('http://localhost:3000/users');
  }

  makeActive(userDetails:any){
    return this._http.patch('http://localhost:3000/users/' + userDetails.id, userDetails).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );;
  }


  //Employees Collection
  getEmployees() {
    return this._http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id: number) {
    return this._http.delete('http://localhost:3000/employees/' + id).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
  }

  addEmployee(userDetails: any) {
    return this._http.post('http://localhost:3000/employees', userDetails).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    );
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


  //Leavedetails Collection
  leaveRequest(userDetails:any){
    return this._http.post('http://localhost:3000/leavedetails', userDetails);
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

  getApprovedLeaveDetails(){
    return this._http.get('http://localhost:3000/leavedetails/?status=Approved');
  }

  getPendingRequest(){
    return this._http.get('http://localhost:3000/leavedetails/?status=Pending');
  }

}
