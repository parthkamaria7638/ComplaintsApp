import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  Users;

  constructor(private db: AngularFireDatabase) {
    this.db.list('/Users') 
      .subscribe(users => {
        this.Users = users;
      });
  }

  ngOnInit() {
  }

}
