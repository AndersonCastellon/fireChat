import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styles: []
})
export class SendMessageFormComponent implements OnInit {
  @Input() enable: boolean;
  constructor() {}

  ngOnInit() {
    console.log(this.enable);
  }
}
