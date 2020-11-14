import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  membershipStatus: any;
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.checkLogin();
    this.authService.getMembership();
  }

  delete() {
    this.authService.deleteMembership();
    this.authService.getMembership();
  }

  displayMembership() {
    let membershipStatus = this.authService.getMembership();
    console.log(membershipStatus);
    if (membershipStatus == undefined) {
      this.membershipStatus = "You don't have any membership";
    } else {
      this.membershipStatus = membershipStatus;
    }
  }

  logoutScript() {
    this.authService.logout();
  }
}
