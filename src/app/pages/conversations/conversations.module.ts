import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversationsRoutingModule } from './conversations-routing.module';
import { ConversationsComponent } from './conversations.component';
import { ConversationComponent } from '../../components/conversation/conversation.component';

@NgModule({
  declarations: [ConversationsComponent, ConversationComponent],
  imports: [CommonModule, ConversationsRoutingModule]
})
export class ConversationsModule {}
