import { Component, OnInit } from '@angular/core';
import { ChatFireDataSourceService } from 'src/app/services/firebase/chat-fire-data-source.service';
import { ConversationModel } from 'src/app/models/conversation.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html'
})
export class ConversationListComponent implements OnInit {
  public conversations: ConversationModel[];
  constructor(private chatService: ChatFireDataSourceService) {}

  ngOnInit() {
    this.chatService.getConversations().subscribe((c) => {
      console.log('conversationlist', c);
      this.conversations = c;
    });
  }
}
