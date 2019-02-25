import { AuthServiceService } from './auth-service.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { SocketService } from './../socket.service';
import { Component, OnInit } from '@angular/core';
import { ComplaintsService } from './complaints.service';
import { async } from 'q';
import { AppUser } from './Models/app-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  JSONdata;
  user: AppUser;

  constructor(
    private auth: AuthServiceService,
    socketService: SocketService,
    complaintsService: ComplaintsService
    ) {
    socketService.reveivedData()
        .subscribe(data => {
          this.JSONdata = JSON.parse(JSON.stringify(data));
          console.log(this.JSONdata);
          if (this.user) {
            if (this.user.role == "Admin") {
              complaintsService.manageComplaints(this.JSONdata);
            }
          }
          
      });
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.user = appUser);
  }
}
 
  