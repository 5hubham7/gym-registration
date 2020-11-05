import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  checkLogin() {
    let currentUser = this.firebaseAuth.currentUser;
    if (currentUser != null) {
      alert('Login first!');
      this.router.navigateByUrl('/login');
    }
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        alert('Signup successful!' + value);
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            this.login(email, password);
            break;
          case 'auth/invalid-email':
            alert('Email address ${password} is invalid.');
            break;
          case 'auth/operation-not-allowed':
            alert('Error during sign up.');
            break;
          case 'auth/weak-password':
            alert(
              'Password is not strong enough. Add additional characters including special characters and numbers.'
            );
            break;
          default:
            console.log(err.message);
            break;
        }
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        alert('Login Successful!');
        this.router.navigateByUrl('/home');
      })
      .catch((err) => {
        alert('Something went wrong:' + err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    this.router.navigateByUrl('/login');
  }
}
