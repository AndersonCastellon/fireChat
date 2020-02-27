import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatBoxRoutingModule } from './chat-box-routing.module';
import { ChatBoxComponent } from './chat-box.component';
import { MessageComponent } from 'src/app/components/message/message.component';

@NgModule({
  declarations: [ChatBoxComponent, MessageComponent],
  imports: [CommonModule, ChatBoxRoutingModule],
  exports: [ChatBoxComponent]
})
export class ChatBoxModule {}
