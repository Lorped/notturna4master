import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditcondPage } from './editcond.page';

const routes: Routes = [
  {
    path: '',
    component: EditcondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditcondPageRoutingModule {}
