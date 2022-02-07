import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TcBaseModule } from '@ngx-tc/base';
import { InputComponent } from './input.component';


@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TcBaseModule
  ],
  exports: [
    InputComponent,
    TcBaseModule
  ]
})
export class TcInputModule { }
