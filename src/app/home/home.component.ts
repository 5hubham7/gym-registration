import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  membershipStatus: string = "You Don't Have Any Membership!";
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkLogin();
    console.log('UID' + this.authService.currentUserId);
    console.log('UID' + this.authService.isAuthenticated);
    this.authService.getMembership();
  }

  delete() {
    alert('Membership Deleted Successfully!');
  }

  logoutScript() {
    this.authService.logout();
  }
}
