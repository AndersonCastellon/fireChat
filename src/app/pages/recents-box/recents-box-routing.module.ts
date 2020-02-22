import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentsBoxComponent } from './recents-box.component';

const routes: Routes = [
  {
    path: '',
    component: RecentsBoxComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecentsBoxRoutingModule {}
