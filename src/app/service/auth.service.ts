import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

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

  get currentUserID() {
    try {
      return this.authState.uid;
    } catch (error) {}
  }

  checkLogin() {
    console.log(this.currentUserID);
    if (this.currentUserID == undefined || this.currentUserID == null) {
      alert('Login first!');
      this.router.navigate(['login']);
    }
  }

  signup(email: string, password: string) {
    let tempObject: Object = {
      Email: email,
    };
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        alert('Signup successful!');
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
    console.log(this.currentUserID);
    alert('Logged Out!');
    // this.router.navigateByUrl('/login');
    this.router.navigate(['login']);
  }

  insert(userData) {
    let user = this.firebaseAuth.currentUser;
    if (user != null) {
      console.log(this.currentUserID);
      this.firestore
        .collection('users')
        .doc(this.currentUserID)
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
      console.log(this.currentUserID);
      this.firestore
        .collection('users')
        .doc(this.currentUserID)
        .update(userData)
        .then(
          (res) => {
            alert('Membership updated successfully');
            // this.router.navigateByUrl('/home');
            this.router.navigate(['home']);

            console.log(res);
          },
          (err) => {
            if (err) {
              alert('First join the membership');
              this.router.navigate(['home']);
            }
          }
        );
    }
  }

  membership: any;

  getMembership() {
    console.log(this.currentUserID);
    // let docRef = this.firestore.collection('users').get();
    // docRef.subscribe((ss) => {
    //   ss.docs.forEach((doc) => {
    //     console.log(doc.data());
    //   });
    // });
    try {
      this.firestore
        .collection('users')
        .doc(this.currentUserID)
        .ref.get()
        .then((doc) => {
          if (doc.exists) {
            this.membership = doc.data().Fees;
          } else {
            this.membership = "You don't have any membership";
          }
        });
      return this.membership;
    } catch (error) {}
  }

  deleteMembership() {
    console.log(this.currentUserID);
    this.firestore
      .collection('users')
      .doc(this.currentUserID)
      .delete()
      .then(() => {
        alert('Membership deleted successfully!');
      });
  }
}
