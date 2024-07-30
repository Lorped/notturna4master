import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiableriePage } from './diablerie.page';

const routes: Routes = [
  {
    path: '',
    component: DiableriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiableriePageRoutingModule {}
