import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
})
export class JoinComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // this.authService.checkLogin();
  }

  gender: string = '';
  fees: string = '';

  setGender(gender: string) {
    this.gender = gender;
  }
  setFees(fees: string) {
    this.fees = fees;
  }

  join(fname, mname, lname, age, phone, address, height, weight, date) {
    let gender = this.gender;
    let fees = this.fees;

    if (
      fname == null ||
      mname == null ||
      lname == null ||
      age == null ||
      phone == null ||
      address == null ||
      gender == null ||
      height == null ||
      weight == null ||
      date == null ||
      fees == null
    ) {
      alert('Something was missing! please try again!');
    } else {
      let userData: object;
      userData = {
        FirstName: fname,
        MiddleName: mname,
        LastName: lname,
        Age: age,
        Phone: phone,
        Address: address,
        Gender: gender,
        Height: height,
        Weight: weight,
        Date: date,
        Fees: fees,
      };
      this.authService.insert(userData);
    }
  }
}
