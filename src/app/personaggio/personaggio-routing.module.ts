import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonaggioPage } from './personaggio.page';

const routes: Routes = [
  {
    path: '',
    component: PersonaggioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonaggioPageRoutingModule {}
