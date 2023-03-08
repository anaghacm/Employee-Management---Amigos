import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  getUsers(){
    return this._http.get('http://localhost:3000/users');
  }

  resetPassword(userDetails:any){
    return this._http.put('http://localhost:3000/users/'+userDetails.id,userDetails);
  }
}
