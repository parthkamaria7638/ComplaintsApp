import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  email_: string = "";
  pass_: string = "";
  username_: string = "";
  isEmailValid: boolean = false;
  isPassValid: boolean = false;
  validateMsg1: boolean = false;
  validateMsg2: boolean = false;
  validateMsg3: boolean = false;
  userDB;

  classEmail = {
    "validate-input": this.isEmailValid,
    "input100": true
  };
  classPass = {
    "validate-input": this.isPassValid,
    "input100": true
  };

  constructor(private auth: AuthServiceService,
    private db: AngularFireDatabase,
    private router: Router
    ) { }

  validateEmail(email: String) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());     
  }

  signUp() {
    localStorage.setItem("signup", "true");
    this.validateEmail(this.email_) ? this.isEmailValid = true : this.isEmailValid = false;
    this.pass_.length >= 6 ? this.isPassValid = true : this.isPassValid = false;
    if (this.isEmailValid && this.isPassValid) {
      this.auth.signup(this.email_, this.pass_)
      .then(user => {
        //console.log(user);
        //console.log(this.username_)
        this.userDB = {
          email: user.email,
          role: "employee",
          username: this.username_
        } 
        
        this.db.object('/Users/' + user.uid)
          .update(this.userDB)
            .then(user => {
              console.log(user);
              this.router.navigate(['login']);
            })
            .catch(err => {
              console.log(err);
            });
      })
      .catch(err => {
        console.log(err);
      });  
    } else {
      console.log("Something went wrong");
    }
  }

  ngOnInit() {
  }

}
