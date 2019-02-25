import { ComplaintsService } from './../complaints.service';
import { Http, Headers } from '@angular/http';
import { SocketService } from './../../socket.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-allcomplaints',
  templateUrl: './allcomplaints.component.html',
  styleUrls: ['./allcomplaints.component.css']
})
export class AllcomplaintsComponent implements OnInit {

  complaints;
  current = new Date().getTime();
  
  constructor(private db: AngularFireDatabase,
    private complaintService: ComplaintsService
    ) { 
    this.db.list('/twittercomplaints')
      .subscribe(data => {
        this.complaints = data;
        console.log(data);
      });
  }

  approveComplaint(complaint) {
    this.db.object('/twittercomplaints/' + complaint.$key)
      .update({ approved: true })
        .then(data => {
          this.complaintService.notifyUserWithTrackingLink(complaint.IssuerID, complaint.$key)
            .subscribe(data => {
              console.log(data);
            });
        })
        .catch(err => {
          console.log('Something went wrong');
        });
  }

  deleteComplaint(complaint) {
    this.db.object('/twittercomplaints/' + complaint.$key).remove();
  }

  ngOnInit() {
  }

}
