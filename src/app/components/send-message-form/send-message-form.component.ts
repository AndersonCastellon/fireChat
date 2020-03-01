import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styles: []
})
export class SendMessageFormComponent implements OnInit {
  @Input() enable: boolean;
  @Output() newMessage: EventEmitter<string>;

  public form: FormGroup;
  constructor() {
    this.newMessage = new EventEmitter();
  }

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required)
    });
  }

  sendMessage() {
    if (this.form.valid) {
      const message = this.form.controls['message'].value;
      this.newMessage.emit(message);
      this.form.reset({});
    }
  }
}
