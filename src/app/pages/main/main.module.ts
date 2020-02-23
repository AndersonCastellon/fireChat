import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ConversationsModule } from '../conversations/conversations.module';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule,
    CommonModule,
    MainRoutingModule,
    AngularFireAuthGuardModule,
    ConversationsModule,
    UsersModule
  ]
})
export class MainModule {}
