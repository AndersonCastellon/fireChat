import { Injectable } from '@angular/core';

// Observable
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Firebase
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
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
  private sendMessageCollection: AngularFirestoreCollection<MessageModel>;

  constructor(private firestore: AngularFirestore) {
    this.currentUser = new UserModel();
    this.currentUser.displayName = 'Anderson Castellon';
    this.currentUser.uid = 'u01';
  }

  getConversations(): Observable<ConversationModel[]> {
    this.conversationsCollection = this.firestore.collection<ConversationModel>(
      `users/${this.currentUser.uid}/conversations`
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

  getChat(conversation: string): Observable<MessageModel[]> {
    this.conversationsCollection
      .doc(conversation)
      .valueChanges()
      .subscribe((convers: ConversationModel) => {
        convers.id = conversation;
        this.setDataConversation(convers);
      });

    this.messagesCollection = this.firestore.collection<MessageModel>(
      `users/${this.currentUser.uid}/conversations/${conversation}/chat`,
      (ref) => ref.orderBy('date', 'asc')
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
  sendMessage(message: MessageModel) {
    const msj = { ...message };
    const currentConversation = this.getConversationId();
    const conversationUsers = this.getUsersConversation();
    const id = this.firestore.createId();

    // Guardar el mensaje en la conversacion del usuario actual
    this.sendMessageCollection = this.firestore.collection<MessageModel>(
      `users/${this.currentUser.uid}/conversations/${currentConversation}/chat`
    );
    this.sendMessageCollection.doc(id).set(msj);

    // Actualizar el ultimo mensaje enviado en la conversacion actual
    this.firestore
      .doc<MessageModel>(
        `users/${this.currentUser.uid}/conversations/${currentConversation}`
      )
      .update(msj);

    // Agregar el mensaje a esta conversación de cada usuario participante
    if (conversationUsers) {
      conversationUsers.forEach((uid) => {
        console.log(uid);
      });
    }
    // Actualizar el ultimo mensaje enviado en cada usuario participante
  }
  deleteMessage() {
    throw new Error('Method not implemented.');
  }

  private setDataConversation(conversation: ConversationModel) {
    localStorage.removeItem('uids');
    localStorage.removeItem('cvrstn');

    if (conversation.users) {
      localStorage.setItem('uids', JSON.stringify(conversation.users));
    }

    localStorage.setItem('cvrstn', conversation.id);
  }

  private getUsersConversation(): [] {
    if (localStorage.getItem('uids')) {
      return JSON.parse(localStorage.getItem('uids'));
    }
  }

  private getConversationId() {
    return localStorage.getItem('cvrstn');
  }
}
