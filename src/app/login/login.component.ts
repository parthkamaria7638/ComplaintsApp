import { AuthServiceService } from './../auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email_: string;
  pass_: string;

  constructor(private auth: AuthServiceService) { }

  login() {
    localStorage.removeItem("signup");
    localStorage.setItem("signup", "false");
    this.auth.login(this.email_, this.pass_)
      .then(user => {
        console.log(user);
      })
      .catch(err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
