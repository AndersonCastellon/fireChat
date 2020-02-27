import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { ChatFlowService } from 'src/app/services/chat-flow.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  public userList = false;
  public chat = false;
  constructor(private auth: AuthService, private chatFlow: ChatFlowService) {}

  ngOnInit() {
    this.createConversation();
    this.loadChat();
  }

  logout() {
    this.auth.logout();
  }

  switchView() {
    this.userList = !this.userList;
    this.chat = !this.chat;
    this.userList ? this.getUserList() : this.getConversationList();
  }

  getUserList() {
    console.log('UserList cargado');
  }
  getConversationList() {
    console.log('ConversationList cargado');
  }

  createConversation() {
    this.chatFlow.conversation.subscribe((conversation) => {
      if (conversation) {
        this.userList = false;
      }
    });
  }

  loadChat() {
    this.chatFlow.chat.subscribe((uid) => {
      if (uid) {
        this.chat = true;
      }
    });
  }
}
