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
    this.onCleanMessages();
    this.chat.getUsers().subscribe((result) => {
      this.users = result;
    });
  }

  public onLoadChat(conversation: ConversationModel) {
    this.chat.getChat(conversation).subscribe((chat) => {
      this.messages = chat;
      this.activeConversation(conversation.uid);
    });
  }

  public onCreateConversation(uid: string) {
    this.showUsers = false;
    // Create new conversation
    const newConversation = this.chat.createConversation([
      uid,
      this.currentUser.uid
    ]);

    setTimeout(() => {
      this.activeConversation(newConversation.uid);
    }, 200);
  }

  private onCleanMessages() {
    this.messages = null;
  }

  private activeConversation(conversationId: string) {
    const conversation = document.getElementById(conversationId);
    conversation.classList.remove('text-muted');
    conversation.classList.add('bg-primary', 'text-white');

    const another = { ...this.conversations };
    // tslint:disable-next-line: forin
    for (const conv in another) {
      const next = another[conv];
      if (next.uid !== conversationId) {
        const anotherElement = document.getElementById(next.uid);
        anotherElement.classList.remove('bg-primary', 'text-white');
        anotherElement.classList.add('text-muted');
      }
    }
  }
}
