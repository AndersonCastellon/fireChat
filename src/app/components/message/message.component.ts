import { Component, OnInit, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { MessageModel } from 'src/app/models/message.model';
import { AuthService } from 'src/app/services/firebase/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  public currentUser: UserModel;
  @Input() message: MessageModel;
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.currentUser = new UserModel();
    this.currentUser = this.auth.getLocalUser();
  }
}
