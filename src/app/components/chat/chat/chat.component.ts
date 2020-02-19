import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageModel } from 'src/app/models/message.model';
import { ChatFireDataSourceService } from 'src/app/services/firebase/chat-fire-data-source.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent {
  public message: MessageModel;
  constructor(private chatService: ChatFireDataSourceService) {
    this.message = new MessageModel();
  }

  sendMessage(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.message.userUid = 'u01';
    this.message.date = new Date().getTime();
    this.message.displayName = 'Anderson Castellon';
    this.chatService.sendMessage(this.message);
    form.controls['message'].reset();
  }
}
