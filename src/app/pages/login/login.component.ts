import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      .btn-google {
        color: white;
        background-color: #ea4335;
        width: 5rem;
      }

      .btn-facebook {
        color: white;
        background-color: #3b5998;
        width: 5rem;
      }

      .btn-twitter {
        color: white;
        background-color: #00acee;
        width: 5rem;
      }
    `
  ]
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  private emptyUser: UserModel;

  constructor(public auth: AuthService) {
    this.emptyUser = new UserModel();
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });

    this.form.controls['email'].setValidators([
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
    ]);
    this.form.controls['password'].setValidators(Validators.required);
  }

  loginWithEmail() {
    if (this.form.invalid) {
      return;
    }
    const email = this.form.value['email'];
    const password = this.form.value['password'];

    this.auth.loginWithEmail(email, password);
    if (this.auth.errorCode === '') {
      this.form.reset(this.emptyUser);
    }
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
  loginWithFacebook() {}
  loginWithTwitter() {}
}
