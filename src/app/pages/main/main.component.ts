import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {
  public userList = false;
  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }

  switchView() {
    this.userList = !this.userList;

    this.userList ? this.getUserList() : this.getConversationList();
  }

  getUserList() {
    console.log('UserList cargado');
    this.route.navigate(['conversations']);
  }
  getConversationList() {
    console.log('ConversationList cargado');
  }
}
