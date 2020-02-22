import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserModel } from '../../models/user.model';
import { passwordConfirmation } from '../../share/password-confirmation.validator';
import { AuthService } from '../../services/firebase/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  private newUser: UserModel;
  private emptyUser: UserModel;

  constructor(public auth: AuthService) {
    this.newUser = new UserModel();
    this.emptyUser = new UserModel();
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')
      ]),
      passwords: new FormGroup(
        {
          password1: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(15)
          ]),
          password2: new FormControl('', [Validators.required])
        },
        { validators: passwordConfirmation }
      )
    });
  }

  registerWithEmail() {
    if (this.form.invalid) {
      return;
    }

    this.newUser = {
      displayName: this.form.value['name'],
      email: this.form.value['email'],
      password: this.form.value['passwords']['password1']
    };

    this.auth.createUserWithEmail(this.newUser);
    this.form.reset(this.emptyUser);
  }
}
