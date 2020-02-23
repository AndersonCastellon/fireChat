import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guard
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectLoggedInTo(['conversations']) },
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/signin/signin.module').then((m) => m.SigninModule)
  },
  {
    path: 'conversations',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo(['login']) },
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'conversations' },
  { path: '**', pathMatch: 'full', redirectTo: 'conversations' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
