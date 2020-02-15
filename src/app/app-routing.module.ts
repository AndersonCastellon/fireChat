import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ChatBoxComponent } from './components/chat/chat-box/chat-box.component';

const routes: Routes = [
  {
    path: 'conversations',
    component: MainComponent,
    children: [
      { path: 'chat/:conversation', component: ChatBoxComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'conversations' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'conversations' },
  { path: '**', pathMatch: 'full', redirectTo: 'conversations' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
