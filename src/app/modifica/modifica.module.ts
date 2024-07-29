import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaPageRoutingModule } from './modifica-routing.module';

import { ModificaPage } from './modifica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaPageRoutingModule
  ],
  declarations: [ModificaPage]
})
export class ModificaPageModule {}
