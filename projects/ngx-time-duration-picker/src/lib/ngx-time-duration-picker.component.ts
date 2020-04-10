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
    year: {
      year: 1,
      month: 12,
      week: 52,
      day: 365,
      hour: 8760,
      minute: 525600,
      second: 3.154e+7,
      millisecond:3.154e+10
    },
    month: {
      year: 0.08333333333333333,
      month: 1,
      week: 4,
      day: 30,
      hour: 730,
      minute: 43800,
      second: 2.628e+6,
      millisecond: 2.628e+9
    },
    week: {
      year: 0.019178066428986496,
      month: 0.23013688541944746,
      week: 1,
      day: 7,
      hour: 168,
      minute: 10080,
      second: 604800,
      millisecond: 604800000
    },
    day: {
      year: 0.0027397260273972603,
      month: 0.03333333333333333,
      week: 0.14285714285714285,
      day: 1,
      hour: 24,
      minute: 1440,
      second: 86400,
      millisecond: 86400000
    },
    hour: {
      year: 0.00011415525114155251,
      month: 0.0013698611371765245,
      week: 0.005952380952380952,
      day: 0.041666666666666664,
      hour: 1,
      minute: 60,
      second: 3600,
      millisecond: 3600000
    },
    minute: {
      year: 0.000001902587519025875,
      month: 0.000022831050228310503,
      week: 0.0000992063492063492,
      day: 0.0006944444444444445,
      hour: 0.016666666666666666,
      minute: 1,
      second: 60,
      millisecond: 60000
    },
    second: {
      year: 3.171e-8,
      month: 3.8052e-7,
      week: 0.0000016534391534391533,
      day: 0.000011574074074074073,
      hour: 0.0002777777777777778,
      minute: 0.016666666666666666,
      second: 1,
      millisecond: 1000
    },
    millisecond: {
      year: 3.171e-11,
      month: 3.8052e-10,
      week: 1.6534391534391537e-9,
      day: 1.1574074074074076e-8,
      hour: 2.777777777777778e-7,
      minute: 0.000016666666666666667,
      second: 0.001,
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

    const supportedUnitsNames = Object.keys(this.supportedUnits);

    if (supportedUnitsNames.indexOf(this.returnedValueUnit) === -1) {
      throw new Error('Unsupported unit: ' + this.returnedValueUnit);
    }

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
