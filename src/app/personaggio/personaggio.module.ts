import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonaggioPageRoutingModule } from './personaggio-routing.module';

import { PersonaggioPage } from './personaggio.page';

import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonaggioPageRoutingModule,
    PipesModule
  ],
  declarations: [PersonaggioPage]
})
export class PersonaggioPageModule {}
