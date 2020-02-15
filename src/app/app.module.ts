import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// components
import { ConversationListComponent } from './components/conversations/conversation-list/conversation-list.component';
import { ConversationComponent } from './components/conversations/conversation/conversation.component';
import { ChatBoxComponent } from './components/chat/chat-box/chat-box.component';
import { MessageComponent } from './components/chat/message/message.component';
import { MainComponent } from './components/main/main.component';
import { ChatComponent } from './components/chat/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    ConversationListComponent,
    ConversationComponent,
    ChatBoxComponent,
    MessageComponent,
    MainComponent,
    ChatComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
