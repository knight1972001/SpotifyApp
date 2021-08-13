import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public warning: any={};
  private liveData:any;

  constructor(private auth: AuthService, private snackBar: MatSnackBar, private router:Router) { }

  ngOnInit(): void {
    this.user=new User();
  }

  onSubmit(): void {
    if(this.validateUserName() && this.validatePassword()){
      this.auth.login(this.user).subscribe(
        (data)=>{
          this.warning.topWarning="";
          localStorage.setItem('access_token', data.accessToken);
          this.snackBar.open("Login Successfully", "Done", { duration: 3500 });
          this.router.navigate(['/']);
        },(error)=>{
          this.warning.topWarning=error.error;
          this.snackBar.open("Login Fail", "Done", { duration: 3500 });
        }
      )
    }else{
      this.warning.topWarning="Please Enter valid value!";
    }
  }

  validateUserName(){
    let check:boolean = true;
    if(this.user.userName === "" || this.user.userName === " " || this.user.userName === undefined){
      this.warning.userName="Please provide a valid user name";
      check=false;
    }else{
      this.warning.userName="";
      check=true;
    }
    return check;
  }

  validatePassword(){
    let check:boolean = true;
    if(this.user.password === " "||this.user.password === "" || this.user.password === undefined){
      this.warning.password="Please provide a valid password";
      check=false;
    }else{
      check=true;
      this.warning.password="";
    }

    return check;
  }
}
