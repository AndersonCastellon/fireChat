import { Injectable, Output, EventEmitter } from '@angular/core';
import { ConversationModel } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ChatFlowService {
  @Output() conversation: EventEmitter<ConversationModel>;
  @Output() chat: EventEmitter<string>;
  constructor() {
    this.conversation = new EventEmitter();
    this.chat = new EventEmitter();
  }

  createConversation(conversation: ConversationModel) {
    this.conversation.emit(conversation);
  }

  loadChat(conversationUid: string) {
    this.chat.emit(conversationUid);
  }
}
