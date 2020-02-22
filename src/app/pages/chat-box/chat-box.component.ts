import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { MessageModel } from 'src/app/models/message.model';
import { ActivatedRoute } from '@angular/router';
import { ChatFireDataSourceService } from 'src/app/services/firebase/chat-fire-data-source.service';

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
    private activatedRoute: ActivatedRoute,
    private chatService: ChatFireDataSourceService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('conversation');
    this.previousId = this.id;
  }

  ngOnInit() {
    this.getChat();
  }

  getChat() {
    this.chatService.getChat(this.id).subscribe((messages) => {
      this.messages = messages;
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
    this.messages = [];
  }
}
