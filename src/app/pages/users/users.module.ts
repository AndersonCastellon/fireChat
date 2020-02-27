import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersComponent } from './users.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [CommonModule, RouterModule],
  exports: [UsersComponent]
})
export class UsersModule {}
