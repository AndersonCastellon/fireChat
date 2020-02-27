import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';

import { MainRoutingModule } from './main-routing.module';

import { MainComponent } from './main.component';
import { ConversationComponent } from '../../components/conversation/conversation.component';
import { MessageComponent } from '../../components/message/message.component';
import { UserComponent } from '../../components/user/user.component';

@NgModule({
  declarations: [
    MainComponent,
    ConversationComponent,
    MessageComponent,
    UserComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MainRoutingModule,
    AngularFireAuthGuardModule
  ]
})
export class MainModule {}
