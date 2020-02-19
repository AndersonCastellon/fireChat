import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';

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
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
  loginWithFacebook() {}
  loginWithTwitter() {}
}
