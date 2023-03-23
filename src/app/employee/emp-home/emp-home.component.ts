import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { faAt, faPhoneAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppendIdPipe } from 'src/app/services/append-id.pipe';


@Component({
  selector: 'app-emp-home',
  templateUrl: './emp-home.component.html',
  styleUrls: ['./emp-home.component.scss']
})
export class EmpHomeComponent implements OnInit {

  public currentUser!: any;
  public userInfo: any={
    image:''
  };

  faPhoneAlt = faPhoneAlt;
  faAt = faAt;
  faEdit = faEdit;

  public fileName!:string;

  constructor(private _api: ApiService, private _snackBar: MatSnackBar, private _appendid:AppendIdPipe) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '');
    this.getEmployeeById();
  }

  ngOnInit(): void {
    this._api.RefreshRequired.subscribe((response) => {
      this.getEmployeeById();
    })
  }

  getEmployeeById(){
    this._api.getEmployeeById(this.currentUser.id).subscribe((response) => {
      this.userInfo = response;
        this._appendid.transform(this.userInfo)
    })
  }
  setFileName(event:any){
    if (event.target.files.length > 0) {
      this.fileName = event.target.files[0].name;
    }
  }

  uploadProfilePic(){
    let userDetails={
      id:this.currentUser.id,
      image:this.fileName
    }
    this._api.updateProfilePic(userDetails).subscribe((response)=>{
      this._snackBar.open("Profile picture successfully", "", {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
    })
  }
}
