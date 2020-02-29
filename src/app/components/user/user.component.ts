import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  @Input() user: UserModel;
  @Input() uid: string;
  @Output() thisUserUid: EventEmitter<string>;
  constructor() {
    this.thisUserUid = new EventEmitter();
  }

  ngOnInit() {}
}
