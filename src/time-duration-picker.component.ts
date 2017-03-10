import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'time-duration-picker',
	template: `
	<div class="row">
    <div *ngFor="let unit of displayUnits" class="col-md-2 form-group">  
      <table>
				<tbody>
					<tr class="text-center">
						<td>
							<button type="button" (click)="increaseValue(unit)" class="btn btn-link">
								+
							</button>
						</td>
					</tr>
					<tr class="text-center">
						<td class="input-group input-group-sm">
							<input [(ngModel)]="unit.value" [disabled]="inputDisabled" class="form-control text-center" style="width:42px;"
							(blur)="checkValue($event, unit)" type="number" min="{{unit.min}}" max="{{unit.max}}"/>  
							<span class="input-group-addon" style="padding: 5px;">{{unit.label}}</span>
						</td>
					</tr>
					<tr class="text-center">
						<td>
							<button type="button" (click)="decreaseValue(unit)" class="btn btn-link">
							-
							</button>
						</td>
					</tr>
					</tbody>
				</table>
    </div>
	</div>
  `,
	styles: [`
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    input[type=number] {
      text-align: center;
    }
  `]
})
export class TimeDurationPickerComponent implements OnInit {
	supportedUnits: any = {
		millisecond: {
			'label': 'Millisecond',
			'max': 99,
			'min': 0,
			'value': 0
		},
		second: {
			'label': 'Second',
			'max': 59,
			'min': 0,
			'value': 0
		},
		minute: {
			'label': 'Minute',
			'max': 59,
			'min': 0,
			'value': 0
		},
		hour: {
			'label': 'Hour',
			'max': 23,
			'min': 0,
			'value': 0
		},
		day: {
			'label': 'Day',
			'max': 7,
			'min': 0,
			'value': 0
		},
		week: {
			'label': 'Week',
			'max': 51,
			'min': 0,
			'value': 0
		}
	};
	private convert: any = {
		'week': {
			'week': 1,
			'day': 7,
			'hour': 168,
			'minute': 10080,
			'second': 604800,
			'millisecond': 604800000
		},
		'day': {
			'week': 0.041666666666666664,
			'day': 1,
			'hour': 24,
			'minute': 1440,
			'second': 86400,
			'millisecond': 86400000
		},
		'hour': {
			'week': 0.0006944444444444445,
			'day': 0.016666666666666666,
			'hour': 1,
			'minute': 60,
			'second': 3600,
			'millisecond': 3600000
		},
		'minute': {
			'week': 0.000011574074074074073,
			'day': 0.0002777777777777778,
			'hour': 0.016666666666666666,
			'minute': 1,
			'second': 60,
			'millisecond': 60000
		},
		'second': {
			'week': 1.1574074074074076e-8,
			'day': 2.777777777777778e-7,
			'hour': 0.000016666666666666667,
			'minute': 0.001,
			'second': 1,
			'millisecond': 1000
		},
		'millisecond': {
			'week': 1.1574074074074076e-8,
			'day': 2.777777777777778e-7,
			'hour': 0.000016666666666666667,
			'minute': 0.001,
			'second': 1,
			'millisecond': 1
		}
	};
	displayUnits: any[] = [];
	@Input() units: any;
	@Input() returnedValueUnit: any;
	@Input() inputDisabled: boolean;

	@Output() onChange: EventEmitter<number> = new EventEmitter();

	constructor() { }

	ngOnInit() {
		if (typeof this.units === 'string') {
			this.units = this.units.split('|');
		} else {
			throw new Error('Unsupported units: ' + this.units);
		}
		const supportedUnitsNames = ['week', 'day', 'hour', 'minute', 'second', 'millisecond'];
		for (var i = 0; i < this.units.length; i++) {
			let element = this.units[i];
			let trimedElement = element.trim().toLowerCase();
			if (supportedUnitsNames.indexOf(trimedElement) === -1) {
				throw new Error('Unsupported unit: ' + trimedElement);
			}
			this.supportedUnits[element.trim().toLowerCase()]['id'] = trimedElement;
			this.displayUnits.push(this.supportedUnits[element.trim().toLowerCase()]);
		}
		this.returnedValueUnit = this.returnedValueUnit.trim().toLowerCase();
		if (!this.returnedValueUnit) {
			this.returnedValueUnit = 'second';
		}
		if (supportedUnitsNames.indexOf(this.returnedValueUnit) === -1) {
			throw new Error('Unsupported unit: ' + this.returnedValueUnit);
		}
		if (this.inputDisabled == null) {
			this.inputDisabled = true;
		}
	}

	private increaseValue(unit: any): void {
		let currentValue = unit.value;
		if (currentValue < unit.max) {
			currentValue = currentValue + 1;
		} else {
			currentValue = unit.min;
		}
		unit.value = currentValue;
		this.updateValue();
	}

	private decreaseValue(unit: any): void {
		let currentValue = unit.value;
		if (currentValue > unit.min) {
			currentValue = currentValue - 1;
		} else {
			currentValue = unit.max;
		}
		unit.value = currentValue;
		this.updateValue();
	}

	private checkValue(event: any, unit: any) {
		let currentValue = event.target.value;
		if (currentValue < unit.min) {
			currentValue = unit.min;
		} else if (currentValue > unit.max) {
			currentValue = unit.max;
		}
		if (currentValue !== parseInt(currentValue)) {
			currentValue = Math.round(currentValue);
		}
		event.target.value = currentValue;
		this.updateValue();
	}

	public updateValue() {
		this.onChange.emit(this.getValue());
	}

	public getValue(): number {
		let value = 0;
		this.displayUnits.forEach(element => {
			value += this.convert[element.id][this.returnedValueUnit] * element.value;
		});
		return value;
	}
}
