import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
} from '@angular/core';

import { NgxTimeDurationPickerUnitComponent } from './ngx-time-duration-picker-unit.component';
import { SupportedUnits } from './time-duration-picker';

@Component({
  selector: 'ngx-time-duration-picker',
  template: `
  <ng-content></ng-content>
  `,
  styles: []
})
export class NgxTimeDurationPickerComponent implements AfterContentInit {

  supportedUnits: SupportedUnits = {
    millisecond: {
      label: 'Millisecond',
      max: 999,
      min: 0,
      value: 0,
      step: 1
    },
    second: {
      label: 'Second',
      max: 59,
      min: 0,
      value: 0,
      step: 1
    },
    minute: {
      label: 'Minute',
      max: 59,
      min: 0,
      value: 0,
      step: 1
    },
    hour: {
      label: 'Hour',
      max: 23,
      min: 0,
      value: 0,
      step: 1
    },
    day: {
      label: 'Day',
      max: 7,
      min: 0,
      value: 0,
      step: 1
    },
    week: {
      label: 'Week',
      max: 51,
      min: 0,
      value: 0,
      step: 1
    },
    month: {
      label: 'Month',
      max: 12,
      min: 0,
      value: 0,
      step: 1
    },
    year: {
      label: 'Year',
      max: 10,
      min: 0,
      value: 0,
      step: 1
    }
  };
  private convert: any = {
    week: {
      week: 1,
      day: 7,
      hour: 168,
      minute: 10080,
      second: 604800,
      millisecond: 604800000
    },
    day: {
      week: 0.041666666666666664,
      day: 1,
      hour: 24,
      minute: 1440,
      second: 86400,
      millisecond: 86400000
    },
    hour: {
      week: 0.0006944444444444445,
      day: 0.016666666666666666,
      hour: 1,
      minute: 60,
      second: 3600,
      millisecond: 3600000
    },
    minute: {
      week: 0.000011574074074074073,
      day: 0.0002777777777777778,
      hour: 0.016666666666666666,
      minute: 1,
      second: 60,
      millisecond: 60000
    },
    second: {
      week: 1.1574074074074076e-8,
      day: 2.777777777777778e-7,
      hour: 0.000016666666666666667,
      minute: 0.001,
      second: 1,
      millisecond: 1000
    },
    millisecond: {
      week: 1.1574074074074076e-8,
      day: 2.777777777777778e-7,
      hour: 0.000016666666666666667,
      minute: 0.001,
      second: 1,
      millisecond: 1
    }
  };
  @Input() returnedValueUnit: any;
  @Input() inputDisabled: boolean;

  @Output() OnChange: EventEmitter<number>;

  @ContentChildren(forwardRef(() => NgxTimeDurationPickerUnitComponent)) units: QueryList<NgxTimeDurationPickerUnitComponent>;
  name: any;

  constructor() {
    this.OnChange = new EventEmitter();
    
  }

  ngAfterContentInit() {
    if (!this.returnedValueUnit) {
      this.returnedValueUnit = 'second';
    }
    this.returnedValueUnit = this.returnedValueUnit.trim().toLowerCase();
    if (this.inputDisabled == null) {
      this.inputDisabled = true;
    }
  }

  public updateValue() {
    this.OnChange.emit(this.getValue());
  }

  public getValue(): number {
    let value = 0;
    this.units.toArray().forEach(element => {
      value += this.convert[element.name.toLocaleLowerCase()][this.returnedValueUnit] * element.getValue();
    });
    return value;
  }
}
