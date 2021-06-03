import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditprofesorPageRoutingModule } from './editprofesor-routing.module';

import { EditprofesorPage } from './editprofesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditprofesorPageRoutingModule
  ],
  declarations: [EditprofesorPage]
})
export class EditprofesorPageModule {}
