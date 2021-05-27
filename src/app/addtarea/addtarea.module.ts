import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddtareaPageRoutingModule } from './addtarea-routing.module';

import { AddtareaPage } from './addtarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddtareaPageRoutingModule
  ],
  declarations: [AddtareaPage]
})
export class AddtareaPageModule {}
