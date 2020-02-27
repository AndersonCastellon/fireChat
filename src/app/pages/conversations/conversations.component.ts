import { Component, OnInit } from '@angular/core';
import { ConversationModel } from 'src/app/models/conversation.model';
import { ChatFireDataSourceService } from 'src/app/services/firebase/chat-fire-data-source.service';
import { ChatFlowService } from 'src/app/services/chat-flow.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html'
})
export class ConversationsComponent implements OnInit {
  public conversations: ConversationModel[] = [];
  constructor(
    private chatService: ChatFireDataSourceService,
    private newConversation: ChatFlowService
  ) {}

  ngOnInit() {
    this.loadConversations();
    this.createConversation();
  }

  loadConversations() {
    this.chatService.getConversations().subscribe((conversationList) => {
      this.conversations = conversationList;
    });
  }

  createConversation() {
    this.newConversation.conversation.subscribe(
      (conversation: ConversationModel) => {
        console.log('Conversacion nueva', conversation);
        if (conversation) {
          this.conversations.unshift(conversation);
        }
        console.log('Lista de conversaciones', this.conversations);
      }
    );
  }
}
