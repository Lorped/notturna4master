import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaoggettiPageRoutingModule } from './listaoggetti-routing.module';

import { ListaoggettiPage } from './listaoggetti.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaoggettiPageRoutingModule
  ],
  declarations: [ListaoggettiPage]
})
export class ListaoggettiPageModule {}
