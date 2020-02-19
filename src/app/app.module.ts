import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// components
import { AppComponent } from './app.component';
import { ConversationListComponent } from './components/conversations/conversation-list/conversation-list.component';
import { ConversationComponent } from './components/conversations/conversation/conversation.component';
import { ChatBoxComponent } from './components/chat/chat-box/chat-box.component';
import { MessageComponent } from './components/chat/message/message.component';
import { MainComponent } from './components/main/main.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    ConversationListComponent,
    ConversationComponent,
    ChatBoxComponent,
    MessageComponent,
    MainComponent,
    ChatComponent,
    LoginComponent,
    SigninComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
