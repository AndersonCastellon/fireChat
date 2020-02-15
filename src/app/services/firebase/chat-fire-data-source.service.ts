import { Injectable } from '@angular/core';

// Observable
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Firebase
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import 'firebase/firestore';
import { MessageModel } from '../../models/message.model';
import { UserModel } from '../..//models/user.model';
import { ConversationModel } from 'src/app/models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class ChatFireDataSourceService {
  private currentUser: UserModel;
  private conversationsCollection: AngularFirestoreCollection<
    ConversationModel
  >;
  private messagesCollection: AngularFirestoreCollection<MessageModel>;

  constructor(private firestore: AngularFirestore) {
    this.currentUser = new UserModel();
    this.currentUser.name = 'Anderson Castellon';
    this.currentUser.id = 'u01';
  }

  getConversations(): Observable<ConversationModel[]> {
    this.conversationsCollection = this.firestore.collection<ConversationModel>(
      `users/${this.currentUser.id}/conversations`
    );
    return this.conversationsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => {
          const data = action.payload.doc.data() as ConversationModel;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getChat(conversation: string) {
    this.messagesCollection = this.firestore.collection<MessageModel>(
      `users/${this.currentUser.id}/conversations/${conversation}/chat`
    );
    return this.messagesCollection.snapshotChanges().pipe(
      map((messages) => {
        return messages.map((message) => {
          const data = message.payload.doc.data() as MessageModel;
          const id = message.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  sendMessage() {
    throw new Error('Method not implemented.');
  }
  deleteMessage() {
    throw new Error('Method not implemented.');
  }
}
