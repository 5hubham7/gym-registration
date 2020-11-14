import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  fees: string = '';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.checkLogin();
  }

  setFees(fees: string) {
    this.fees = fees;
  }

  update() {
    if (this.fees == null) {
      alert('Please select the membership!');
    } else {
      let userData: object;
      userData = {
        Fees: this.fees,
      };
      this.authService.update(userData);
    }
  }
}
