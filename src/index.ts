import { NgModule, ModuleWithProviders, NO_ERRORS_SCHEMA } from '@angular/core';

import { TimeDurationPickerComponent } from './time-duration-picker.component';
import { TimeDurationPickerUnitComponent } from './time-duration-picker-unit.component';

export * from './time-duration-picker.component';
export * from './time-duration-picker-unit.component';

@NgModule({
  declarations: [
    TimeDurationPickerComponent,
    TimeDurationPickerUnitComponent
  ],
  exports: [
    TimeDurationPickerComponent,
    TimeDurationPickerUnitComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class TimeDurationPickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimeDurationPickerModule,
      providers: []
    };
  }
}
