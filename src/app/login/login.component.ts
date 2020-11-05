import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  loginScript(email: string, password: string) {
    this.authService.signup(email, password);
  }

  // login() {
  //   this.authService.login(this.email, this.password);
  //   this.email = this.password = '';
  // }

  logout() {
    this.authService.logout();
  }
}
