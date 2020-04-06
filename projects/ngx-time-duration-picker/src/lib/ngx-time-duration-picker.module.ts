import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxTimeDurationPickerUnitComponent } from './ngx-time-duration-picker-unit.component';
import { NgxTimeDurationPickerComponent } from './ngx-time-duration-picker.component';
import { LongPress } from './long-press';

@NgModule({
  declarations: [
    NgxTimeDurationPickerComponent,
    NgxTimeDurationPickerUnitComponent,
    LongPress
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NgxTimeDurationPickerComponent,
    NgxTimeDurationPickerUnitComponent
  ]
})
export class NgxTimeDurationPickerModule { }
