import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = false;
  public loginForm!: FormGroup;
  constructor(private _fb: FormBuilder, private _router: Router, private _api: ApiService, private _snackBar: MatSnackBar) {
    // _api.getUsers().subscribe((response)=>{
    //   console.log(response)
    // });
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.loginForm.valid) {
      let username = this.loginForm.value.username;
      let password = this.loginForm.value.password;
      this._api.getUsers().subscribe((response: any) => {
        let user = response.filter((user: any) => {
          return user.username == username && user.password == password
        })
        if (user.length > 0) {
          localStorage.setItem('currentUser', JSON.stringify(user[0]));
          if (user[0].category == 'hr') {
            this._router.navigateByUrl('hr');
          }
          else if (user[0].category == 'emp') {
            this._router.navigateByUrl('employees');
          }
        }
        else {
          this._snackBar.open("Incorrect username or password", "", {
            duration: 2000,
            panelClass: ['error-snackbar']
          });
          this.loginForm.reset();
        }
      });

    }
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
