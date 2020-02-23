import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversationsComponent } from './conversations.component';
import { ConversationComponent } from '../../components/conversation/conversation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ConversationsComponent, ConversationComponent],
  imports: [CommonModule, RouterModule],
  exports: [ConversationsComponent]
})
export class ConversationsModule {}
