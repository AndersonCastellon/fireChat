import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
    <div class="py-5 px-4">
      <div class="row rounded-lg overflow-hidden shadow">
        <div class="col-5 px-0">
          <app-conversation-list></app-conversation-list>
        </div>
        <div class="col-7 px-0">
          <app-chat></app-chat>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
