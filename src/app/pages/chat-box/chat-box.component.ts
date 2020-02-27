import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { MessageModel } from 'src/app/models/message.model';
import { ChatFireDataSourceService } from 'src/app/services/firebase/chat-fire-data-source.service';
import { ChatFlowService } from 'src/app/services/chat-flow.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styles: []
})
export class ChatBoxComponent implements OnInit, DoCheck, OnDestroy {
  public messages: MessageModel[];
  private id: string;
  private previousId: string;
  constructor(
    private chatService: ChatFireDataSourceService,
    private chatFlow: ChatFlowService
  ) {}

  ngOnInit() {
    this.loadChat();
  }

  getChat() {
    this.chatService.getChat(this.id).subscribe((messages) => {
      this.messages = messages;
    });
  }

  ngDoCheck() {
    console.log('DoCheck ejecutado');

    if (this.id === this.previousId) {
      return;
    }
    this.loadChat();
    this.getChat();
  }

  ngOnDestroy(): void {
    this.messages = [];
  }

  private loadChat() {
    this.chatFlow.chat.subscribe((uid: string) => {
      if (uid) {
        this.id = uid;
        this.previousId = uid;
        this.getChat();
      }
    });
  }
}
