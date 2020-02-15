import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatFireDataSourceService } from 'src/app/services/firebase/chat-fire-data-source.service';
import { MessageModel } from 'src/app/models/message.model';

@Component({
  selector: 'app-chat-box',
  template: `
    <app-message *ngFor="let message of chat" [message]="message"></app-message>
  `
})
export class ChatBoxComponent implements OnInit, OnDestroy, DoCheck {
  public chat: MessageModel[];
  private id: string;
  private previousId: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private chatService: ChatFireDataSourceService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('conversation');
    this.previousId = this.id;
  }

  ngOnInit() {
    console.log('OnInit ejecutado');
    this.getChat();
  }

  getChat() {
    this.chatService.getChat(this.id).subscribe((messages) => {
      this.chat = messages;
    });
  }

  ngDoCheck() {
    console.log('DoCheck ejecutado');
    this.id = this.activatedRoute.snapshot.paramMap.get('conversation');
    if (this.id === this.previousId) {
      return;
    }
    this.previousId = this.id;
    this.getChat();
  }

  ngOnDestroy(): void {
    this.chat = [];
  }
}
