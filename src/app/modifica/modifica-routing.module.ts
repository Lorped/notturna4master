import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaPage } from './modifica.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaPageRoutingModule {}
