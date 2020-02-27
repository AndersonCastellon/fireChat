import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ChatFireDataSourceService } from 'src/app/services/firebase/chat-fire-data-source.service';
import { ConversationModel } from 'src/app/models/conversation.model';
import { ChatFlowService } from 'src/app/services/chat-flow.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  @Input() user: UserModel;
  public localUser: UserModel;
  constructor(
    private auth: AuthService,
    private chatFlow: ChatFlowService,
    private chat: ChatFireDataSourceService
  ) {}

  ngOnInit() {
    this.localUser = this.auth.getLocalUser();
  }

  createConversation(uid: string) {
    const usrs = [uid, this.localUser.uid];
    this.chatFlow.createConversation(this.chat.createConversation(usrs));
  }
}
