import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendmessaggioPage } from './sendmessaggio.page';

const routes: Routes = [
  {
    path: '',
    component: SendmessaggioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendmessaggioPageRoutingModule {}
