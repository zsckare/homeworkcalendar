import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddprofesorPageRoutingModule } from './addprofesor-routing.module';

import { AddprofesorPage } from './addprofesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddprofesorPageRoutingModule
  ],
  declarations: [AddprofesorPage]
})
export class AddprofesorPageModule {}
