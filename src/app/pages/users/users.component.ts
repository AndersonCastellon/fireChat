import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { ChatFireDataSourceService } from 'src/app/services/firebase/chat-fire-data-source.service';
import { ConversationModel } from 'src/app/models/conversation.model';
import { ChatFlowService } from 'src/app/services/chat-flow.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  public users: UserModel[];

  constructor(private firestore: ChatFireDataSourceService) {}

  ngOnInit() {
    this.firestore.getUsers().subscribe((usrs: UserModel[]) => {
      this.users = usrs;
    });
  }
}
