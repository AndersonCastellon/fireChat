import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConversationModel } from 'src/app/models/conversation.model';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styles: []
})
export class ConversationComponent implements OnInit {
  @Input() conversation: ConversationModel;
  @Output() thisConversation: EventEmitter<ConversationModel>;
  constructor() {
    this.thisConversation = new EventEmitter();
  }

  ngOnInit() {}
}
