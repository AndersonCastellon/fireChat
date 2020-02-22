import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'conversations' },
      {
        path: 'conversations',
        loadChildren: () =>
          import('../conversations/conversations.module').then(
            (m) => m.ConversationsModule
          )
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../users/users.module').then((m) => m.UsersModule)
      },
      {
        path: 'conversations/:conversation',
        outlet: 'chat',
        loadChildren: () =>
          import('../chat-box/chat-box.module').then((m) => m.ChatBoxModule)
      },
      { path: '**', pathMatch: 'full', redirectTo: 'conversations' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
