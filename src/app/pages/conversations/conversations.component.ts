import { Component, OnInit } from '@angular/core';
import { ConversationModel } from 'src/app/models/conversation.model';
import { ChatFireDataSourceService } from 'src/app/services/firebase/chat-fire-data-source.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html'
})
export class ConversationsComponent implements OnInit {
  public conversations: ConversationModel[];
  constructor(private chatService: ChatFireDataSourceService) {}

  ngOnInit() {
    this.chatService.getConversations().subscribe((c) => {
      this.conversations = c;
    });
  }
}
