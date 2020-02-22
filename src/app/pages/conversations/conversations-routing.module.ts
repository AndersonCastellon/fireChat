import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversationsComponent } from './conversations.component';

const routes: Routes = [
  {
    path: '',
    component: ConversationsComponent,
    children: [
      {
        path: ':conversation',
        outlet: 'chat',
        loadChildren: () =>
          import('../chat-box/chat-box.module').then((m) => m.ChatBoxModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationsRoutingModule {}
