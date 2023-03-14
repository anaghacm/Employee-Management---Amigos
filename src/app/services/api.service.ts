import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _refreshRequired = new Subject<void>();

  constructor(private _http:HttpClient) { }

  get RefreshRequired(){
    return this._refreshRequired;
  }
  getUsers(){
    return this._http.get('http://localhost:3000/users');
  }

  resetPassword(userDetails:any){
    return this._http.put('http://localhost:3000/users/'+userDetails.id,userDetails);
  }

  getEmployees(){
    return this._http.get('http://localhost:3000/employees');
  }
  deleteEmployee(id:number){
    return this._http.delete('http://localhost:3000/employees/'+id);
  }

  editEmployee(userDetails:any){
    return this._http.put('http://localhost:3000/employees/'+userDetails.id,userDetails).pipe(
      tap(()=>{
        this.RefreshRequired.next();
      })
    );
  }
}
