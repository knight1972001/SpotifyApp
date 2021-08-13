import { Component, OnInit } from '@angular/core';
import { RegisterUser } from '../RegisterUser';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser: RegisterUser;
  public warning: any={};
  private liveData:any;
  public success:boolean = false;

  constructor(private auth: AuthService, private snackBar: MatSnackBar,  private router:Router) { }

  ngOnInit(): void {
    this.registerUser = new RegisterUser();
  }

  onSubmit(): void {
    let check:boolean=true;
    if(this.registerUser.password !== this.registerUser.password2){
      this.warning.topWarning="Please check your password. Password is not match!";
      check=false;
    }

    if(this.validateUserName() && this.validatePassword() && this.validatePassword2() && check){
      this.liveData=this.auth.register(this.registerUser).subscribe(success =>{
        this.warning.topWarning="";
        this.success=true;
        this.snackBar.open(success, "Done", { duration: 3500 });
        this.router.navigate(['/login'])
      },
      error => {
        this.warning.topWarning=error.error;
      })
    }else{
      console.log("Fail!")
    }
    
  }

  validateUserName(){
    let check:boolean = true;
    if(this.registerUser.userName === "" || this.registerUser.userName === " " || this.registerUser.userName === undefined){
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
    if(this.registerUser.password === " "||this.registerUser.password === "" || this.registerUser.password === undefined){
      this.warning.password="Please provide a valid password";
      check=false;
    }else{
      check=true;
      this.warning.password="";
    }

    return check;
  }

  validatePassword2(){
    let check:boolean = true;
    if(this.registerUser.password2 === " "||this.registerUser.password2 === "" || this.registerUser.password2=== undefined){
      this.warning.password2="Please provide a valid password";
      check=false;
    }else{
      check=true;
      this.warning.password2="";
    }
    return check;
  }
}
