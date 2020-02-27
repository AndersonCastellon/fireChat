import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth.service';
import { MessageModel } from '../../models/message.model';
import { ConversationModel } from 'src/app/models/conversation.model';
import { UserModel } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/firebase/chat.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  public currentUser: UserModel;

  public messages: MessageModel[];
  public conversations: ConversationModel[];
  public users: UserModel[];

  public showUsers: boolean;

  constructor(private auth: AuthService, private chat: ChatService) {
    this.currentUser = auth.getLocalUser();
  }

  ngOnInit() {
    this.showUsers = false;
    this.getConversations();
  }

  logout() {
    this.auth.logout();
  }

  switchView() {
    this.showUsers = !this.showUsers;
    this.showUsers ? this.getUsers() : this.getConversations;
  }

  private getConversations() {
    this.chat.getConversations().subscribe((result) => {
      this.conversations = result;
    });
  }

  private getUsers() {
    this.chat.getUsers().subscribe((result) => {
      this.users = result;
    });
  }

  public onLoadChat(conversationId: string) {
    this.chat.getChat(conversationId).subscribe((chat) => {
      this.messages = chat;
    });
  }

  public onCreateConversation(uid: string) {}
}
