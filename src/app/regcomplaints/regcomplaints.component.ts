import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regcomplaints',
  templateUrl: './regcomplaints.component.html',
  styleUrls: ['./regcomplaints.component.css']
})
export class RegcomplaintsComponent implements OnInit {

  complaints;

  constructor(db: AngularFireDatabase) { 
    db.list('/twittercomplaints')
      .subscribe(data => {
        this.complaints = data;
        console.log(data);
      });
  }

  ngOnInit() {
  }

}
