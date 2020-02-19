import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user) => {
      if (!user) {
        return;
      }
      const usr: UserModel = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        refreshToken: user.refreshToken
      };
      this.saveCurrentUser(usr);
    });
  }

  createUserWithEmail(user: UserModel) {
    return this.afAuth.auth.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  loginWithEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  loginWithFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  loginWithTwitter() {
    this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
    localStorage.clear();
  }

  public deleteCurrentUser() {
    if (localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
  }

  public saveCurrentUser(user: UserModel) {
    if (localStorage.getItem('user')) {
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
  }

  public getCurrentUser() {
    if (localStorage.getItem('user')) {
      return localStorage.getItem('user');
    }
  }
}
