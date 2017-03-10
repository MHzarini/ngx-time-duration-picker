import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDurationPickerComponent } from './src/time-duration-picker.component';

export * from './src/time-duration-picker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TimeDurationPickerComponent
  ],
  exports: [
    TimeDurationPickerComponent
  ]
})
export class TimeDurationPickerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimeDurationPickerModule,
      providers: []
    };
  }
}
