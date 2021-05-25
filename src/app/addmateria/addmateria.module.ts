import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddmateriaPageRoutingModule } from './addmateria-routing.module';

import { AddmateriaPage } from './addmateria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddmateriaPageRoutingModule
  ],
  declarations: [AddmateriaPage]
})
export class AddmateriaPageModule {}
