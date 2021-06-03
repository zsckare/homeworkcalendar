import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddexamenPageRoutingModule } from './addexamen-routing.module';

import { AddexamenPage } from './addexamen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddexamenPageRoutingModule
  ],
  declarations: [AddexamenPage]
})
export class AddexamenPageModule {}
