import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../_dialogs/change-password-dialog/change-password-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router,private matDialog: MatDialog) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate([`home`]);
      //this.roles = this.tokenStorage.getUser().roles;
      
    }
  }

  Login() {
    this.errorMessage = '';
    this.isLoginFailed = false;
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        if(this.form.password == "temporal"){
          this.showChgPwPopUp(); 
        }else{
          this.reloadPage();
        }

      },
      err => {
        console.log(err.error.message); 

        if(err.error.message == "Error: Unauthorized" ){
          this.errorMessage = "Credenciales erróneas";
        }else{
          this.errorMessage = err.error.message;
        }
        
        this.isLoginFailed = true;
      }
    );
  }

  showChgPwPopUp(){
    const dialogRef = this.matDialog.open(ChangePasswordDialogComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['perfil']);
      this.reloadPage();
    });
  }

  reloadPage() {
    window.location.reload();
  }
}