import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any;
  authState: any = null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.user = firebaseAuth.authState;
    this.firebaseAuth.authState.subscribe((authState) => {
      this.authState = authState;
    });
  }

  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : null;
  }

  checkLogin() {
    if (this.currentUserId == null) {
      // alert('Login first!');
      // this.router.navigateByUrl('/login');
    }
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        alert('Signup successful!' + value);
        // this.router.navigateByUrl('/home');
        this.router.navigate(['home']);
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
            this.login(email, password);
            break;
          case 'auth/invalid-email':
            alert('Email address/password is invalid.');
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
        // this.router.navigateByUrl('/home');
        this.router.navigate(['home']);
      })
      .catch((err) => {
        alert('Something went wrong:' + err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    alert('Logged Out!');
    // this.router.navigateByUrl('/login');
    this.router.navigate(['login']);
  }

  insert(userData) {
    let user = this.firebaseAuth.currentUser;
    if (user != null) {
      console.log(this.currentUserId);
      this.firestore
        .collection('users')
        .doc(this.currentUserId)
        .set(userData)
        .then(
          (res) => {
            alert('Membership joined successfully');
            // this.router.navigateByUrl('/home');
            this.router.navigate(['home']);

            console.log(res);
          },
          (err) => console.log(err)
        );
    }
  }

  update(userData) {
    let user = this.firebaseAuth.currentUser;
    if (user != null) {
      console.log(this.currentUserId);
      this.firestore
        .collection('users')
        .doc(this.currentUserId)
        .update(userData)
        .then(
          (res) => {
            alert('Membership updated successfully');
            // this.router.navigateByUrl('/home');
            this.router.navigate(['home']);

            console.log(res);
          },
          (err) => console.log(err)
        );
    }
  }

  getMembership() {
    console.log(this.currentUserId);
    let docRef = this.firestore
      .collection('users')
      .doc(this.currentUserId)
      .get();

    console.log();
  }
}
