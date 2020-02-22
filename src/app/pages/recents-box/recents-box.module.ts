import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentsBoxRoutingModule } from './recents-box-routing.module';
import { RecentsBoxComponent } from './recents-box.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RecentsBoxComponent],
  imports: [CommonModule, RecentsBoxRoutingModule, RouterModule]
})
export class RecentsBoxModule {}
