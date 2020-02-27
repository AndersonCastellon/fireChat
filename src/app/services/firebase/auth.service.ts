import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserModel } from 'src/app/models/user.model';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public errorCode: string;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    afAuth.authState.subscribe((user) => {
      if (!user) {
        return;
      }
    });
  }

  createUserWithEmail(user: UserModel) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .catch((error) => {
        this.errorCode = error.code;
      })
      .then((resolve: any) => {
        if (resolve) {
          delete user.password;
          user.uid = resolve.user.uid;
          user.refreshToken = resolve.user.refreshToken;
          user.providerId = resolve.additionalUserInfo.providerId;
          user.lastSignInTime = resolve.user.metadata.b;

          this.saveCurrentUser(user);
          this.getToConversations();
        }
      });
  }

  loginWithEmail(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        this.errorCode = error.code;
      })
      .then((resolve: any) => {
        if (resolve) {
          this.getCurrentUser(resolve.user.uid);
          this.getToConversations();
        }
      });
  }
  loginWithGoogle() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())

      .catch((error) => {
        this.errorCode = error.code;
      })
      .then((resolve: any) => {
        if (resolve) {
          this.saveCurrentUser(this.makeUser(resolve));
          this.getToConversations();
        }
      });
  }
  loginWithFacebook() {
    this.afAuth.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .catch((error) => (this.errorCode = error.code))
      .then((resolve) => {
        if (resolve) {
          this.saveCurrentUser(this.makeUser(resolve));
          this.getToConversations();
        }
      });
  }
  loginWithTwitter() {
    return this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }
  logout() {
    this.afAuth.auth
      .signOut()
      .catch((error) => {
        this.errorCode = error.code;
      })
      .then(() => {
        localStorage.clear();
        this.router.navigate(['login']);
      });
  }

  saveCurrentUser(user: UserModel) {
    const usr: UserModel = { ...user };
    delete usr.uid;

    const doc = this.firestore
      .collection<UserModel>(`users/`)
      .doc(user.uid)
      .set(usr);

    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }

    localStorage.setItem('user', JSON.stringify(user));
  }

  getCurrentUser(uid: string) {
    this.firestore
      .doc<UserModel>(`users/${uid}`)
      .valueChanges()
      .subscribe((user) => {
        user.uid = uid;
        if (localStorage.getItem('user')) {
          localStorage.removeItem('user');
        }
        localStorage.setItem('user', JSON.stringify(user));
      });
  }

  getLocalUser() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  private getToConversations() {
    this.router.navigate(['conversations']);
  }

  private makeUser(resolve: any) {
    const user: UserModel = {
      uid: resolve.user.uid,
      displayName: resolve.user.displayName,
      email: resolve.user.email,
      photoURL: resolve.user.photoURL,
      refreshToken: resolve.user.refreshToken,
      providerId: resolve.additionalUserInfo.providerId,
      lastSignInTime: resolve.user.metadata.b
    };
    return user;
  }
}
