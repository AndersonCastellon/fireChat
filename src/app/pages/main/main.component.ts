import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }

  switchView() {}
}
