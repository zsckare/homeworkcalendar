import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddexamenPage } from './addexamen.page';

const routes: Routes = [
  {
    path: '',
    component: AddexamenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddexamenPageRoutingModule {}
