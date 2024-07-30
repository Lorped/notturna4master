import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditcondPageRoutingModule } from './editcond-routing.module';

import { EditcondPage } from './editcond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditcondPageRoutingModule
  ],
  declarations: [EditcondPage]
})
export class EditcondPageModule {}
