import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddtareaPage } from './addtarea.page';

const routes: Routes = [
  {
    path: '',
    component: AddtareaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddtareaPageRoutingModule {}
