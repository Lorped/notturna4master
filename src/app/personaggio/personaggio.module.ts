import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonaggioPageRoutingModule } from './personaggio-routing.module';

import { PersonaggioPage } from './personaggio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaggioPage,
    PersonaggioPageRoutingModule,
  ],
})
export class PersonaggioPageModule {}
