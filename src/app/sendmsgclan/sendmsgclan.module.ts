import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendmsgclanPageRoutingModule } from './sendmsgclan-routing.module';

import { SendmsgclanPage } from './sendmsgclan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendmsgclanPageRoutingModule
  ],
  declarations: [SendmsgclanPage]
})
export class SendmsgclanPageModule {}
