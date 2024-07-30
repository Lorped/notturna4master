import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiableriePageRoutingModule } from './diablerie-routing.module';

import { DiableriePage } from './diablerie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiableriePageRoutingModule
  ],
  declarations: [DiableriePage]
})
export class DiableriePageModule {}
