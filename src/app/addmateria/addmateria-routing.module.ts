import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddmateriaPage } from './addmateria.page';

const routes: Routes = [
  {
    path: '',
    component: AddmateriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddmateriaPageRoutingModule {}
