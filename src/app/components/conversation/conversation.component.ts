import { Component, OnInit, Input } from '@angular/core';
import { ConversationModel } from 'src/app/models/conversation.model';
import { ChatFlowService } from 'src/app/services/chat-flow.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styles: []
})
export class ConversationComponent implements OnInit {
  @Input() conversation: ConversationModel;
  constructor(private chatFlow: ChatFlowService) {}

  ngOnInit() {}

  loadChat(conversationUid: string) {
    this.chatFlow.loadChat(conversationUid);
  }
}
