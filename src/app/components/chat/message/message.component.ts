import { Component, OnInit, Input } from '@angular/core';
import { MessageModel } from 'src/app/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  @Input() message: MessageModel;
  constructor() {}

  ngOnInit() {
  }
}
