import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public showPassword: boolean = false;
  public showCPassword: boolean = false;
  public resetPasswordForm!: FormGroup;
  constructor(private _fb: FormBuilder, private _router: Router, private _api: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resetPasswordForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required]
    })
  }

  passwordVisibility() {
    this.showPassword = !this.showPassword;
  }
  cpasswordVisibility() {
    this.showCPassword = !this.showCPassword;
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      let username = this.resetPasswordForm.value.username;
      let password = this.resetPasswordForm.value.password;
      let cpassword = this.resetPasswordForm.value.cpassword;
      if (password === cpassword) {
        this._api.getUsers().subscribe((response: any) => {

          let user = response.filter((user: any) => {
            return user.username == username
          })
          if (user.length > 0) {
            let id = user[0].id;
            let category = user[0].category;
            // let userInfo = {
            //   id,
            //   username,
            //   password,
            //   category
            // }
            let userInfo={
              id,
              password
            }
            this._api.resetPassword(userInfo).subscribe((response) => {
              this._snackBar.open("Password updated successfully", "", {
                duration: 2000,
                panelClass: ['success-snackbar']
              });
              this._router.navigateByUrl('login');
            })
          }
          else {
            this._snackBar.open("Incorrect username", "", {
              duration: 2000,
              panelClass: ['error-snackbar']
            });
            this.resetPasswordForm.reset();
          }
        });
      }
    }
  }
  
}
