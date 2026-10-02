import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendmessaggioPageRoutingModule } from './sendmessaggio-routing.module';

import { SendmessaggioPage } from './sendmessaggio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendmessaggioPage,
    SendmessaggioPageRoutingModule
  ],
})
export class SendmessaggioPageModule {}
