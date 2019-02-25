import { TimeRemaining } from './../timeremaining.pipe';
import { ComplaintsService } from './complaints.service';
import { AuthServiceService } from './auth-service.service';
import { HomeComponent } from './home/home.component';
import { SocketService } from './../socket.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { Http, HttpModule } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';
import { AllcomplaintsComponent } from './allcomplaints/allcomplaints.component';
import { RegcomplaintsComponent } from './regcomplaints/regcomplaints.component';
import { Approved } from '../approved.pipe';
import { Unanalysed } from '../unanalysed.pipe';
import { UsersComponent } from './users/users.component';
import { UserstatusComponent } from './userstatus/userstatus.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, },
  { path: 'signup', component: SignupComponent },
  { path: 'allcomplaints', component: AllcomplaintsComponent },
  { path: 'regcomplaints', component: RegcomplaintsComponent },
  { path: 'users', component: UsersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AllcomplaintsComponent,
    RegcomplaintsComponent,
    TimeRemaining,
    Approved,
    Unanalysed,
    UsersComponent,
    UserstatusComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
  ],
  providers: [SocketService, AuthServiceService, UserService, ComplaintsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
