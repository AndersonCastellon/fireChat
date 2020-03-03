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
import { UserModel } from '../../models/user.model';
import { ConversationModel } from 'src/app/models/conversation.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private currentUser: UserModel;
  private usersCollection: AngularFirestoreCollection<UserModel>;
  private conversationsCollection: AngularFirestoreCollection<
    ConversationModel
  >;
  private messagesCollection: AngularFirestoreCollection<MessageModel>;
  private sendMessageCollection: AngularFirestoreCollection<MessageModel>;

  constructor(private firestore: AngularFirestore, private auth: AuthService) {
    this.currentUser = this.auth.getLocalUser();
  }

  getUsers() {
    this.usersCollection = this.firestore.collection<UserModel>(`users`);
    return this.usersCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => {
          const data = action.payload.doc.data() as UserModel;
          const uid = action.payload.doc.id;
          return { uid, ...data };
        });
      })
    );
  }

  getConversations(): Observable<ConversationModel[]> {
    this.conversationsCollection = this.firestore.collection<ConversationModel>(
      `users/${this.currentUser.uid}/conversations`,
      (ref) => ref.orderBy('date', 'asc')
    );
    return this.conversationsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((action) => {
          const data = action.payload.doc.data() as ConversationModel;
          const uid = action.payload.doc.id;
          return { uid, ...data };
        });
      })
    );
  }

  createConversation(anotherUser: UserModel) {
    const id = this.firestore.createId();
    const newConversation: ConversationModel = {
      uid: id,
      displayName: anotherUser.displayName,
      userUid: anotherUser.uid,
      users: [anotherUser.uid, this.currentUser.uid],
      message: '',
      photoURL: anotherUser.photoURL,
      date: new Date().getTime()
    };

    this.setDataConversation(newConversation);
    this.saveConversation(newConversation, this.currentUser.uid);

    return newConversation;
  }

  saveConversation(conversation: ConversationModel, uid: string) {
    const conv = { ...conversation };
    delete conv.uid;

    this.firestore
      .collection<ConversationModel>(`users/${uid}/conversations`)
      .doc(conversation.uid)
      .set(conv);
  }

  deleteConversation(conversation: ConversationModel) {}

  getChat(conversation: ConversationModel): Observable<MessageModel[]> {
    this.setDataConversation(conversation);

    this.messagesCollection = this.firestore.collection<MessageModel>(
      `users/${this.currentUser.uid}/conversations/${conversation.uid}/chat`,
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
  sendMessage(msj: string) {
    const currentConversation = this.getCurrentConversationId();
    const conversationUsers = this.getCurrentUsersConversationId();
    const id = this.firestore.createId();

    const message: MessageModel = {
      userUid: this.currentUser.uid,
      displayName: this.currentUser.displayName,
      photoURL: this.currentUser.photoURL,
      message: msj,
      date: new Date().getTime()
    };

    // Agregar el mensaje a esta conversación de cada usuario participante
    if (conversationUsers) {
      conversationUsers.forEach((uid) => {
        // Guardar el mensaje en la conversacion del usuario actual
        this.sendMessageCollection = this.firestore.collection<MessageModel>(
          `users/${uid}/conversations/${currentConversation}/chat`
        );
        this.sendMessageCollection.doc(id).set(message);

        // Actualizar el ultimo mensaje enviado en la conversacion actual
        this.firestore
          .doc<MessageModel>(
            `users/${uid}/conversations/${currentConversation}`
          )
          .update(message);
      });
    }
  }
  deleteMessage() {
    throw new Error('Method not implemented.');
  }

  private setDataConversation(conversation: ConversationModel) {
    localStorage.removeItem('currentConversation');

    if (conversation) {
      localStorage.setItem('currentConversation', JSON.stringify(conversation));
    }
  }

  private getCurrentUsersConversationId(): [] {
    if (localStorage.getItem('uids')) {
      return JSON.parse(localStorage.getItem('uids'));
    }
  }

  private getCurrentConversationId(): string {
    return localStorage.getItem('currentConversation');
  }
}
