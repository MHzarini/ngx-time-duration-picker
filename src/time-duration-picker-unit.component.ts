import { Component, EventEmitter, Input, OnInit, Output, Host, Inject, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';

import { TimeDurationPickerComponent } from './time-duration-picker.component';

@Component({
	selector: 'time-duration-picker-unit',
	template: `
	<div class="form-group">
		<table>
			<tbody>
				<tr class="text-center">
					<td>
						<button type="button" (click)="increaseValue()" class="btn btn-link">
							+
						</button>
					</td>
				</tr>
				<tr class="text-center">
					<td class="input-group input-group-sm">
						<input [(ngModel)]="value" [disabled]="inputDisabled" class="form-control text-center" style="width:42px;"
						(blur)="checkValue($event)" type="number" min="{{min}}" max="{{max}}"/>  
						<span class="input-group-addon" style="padding: 5px;">{{label}}</span>
					</td>
				</tr>
				<tr class="text-center">
					<td>
						<button type="button" (click)="decreaseValue()" class="btn btn-link">
						-
						</button>
					</td>
				</tr>
			</tbody>
		</table>
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
export class TimeDurationPickerUnitComponent implements OnInit {

	@Input() name: string;
	@Input() label: string;
	@Input() max: number;
	@Input() min: number;
	@Input() step: number;
	@Input() inputDisabled: boolean;

	@Output() onChange: EventEmitter<number> = new EventEmitter();

	private value: number = 0;

	constructor(@Host() @Inject(forwardRef(() => TimeDurationPickerComponent)) public timeDurationPicker: TimeDurationPickerComponent) { }

	ngOnInit() {
		this.name = this.name.toLocaleLowerCase();
		const supportedUnitsNames = Object.keys(this.timeDurationPicker.supportedUnits);
		if (supportedUnitsNames.indexOf(this.name) === -1) {
			throw new Error('Unsupported unit: ' + this.name);
		}
		if (this.label == null) {
			this.label = this.name.charAt(0).toUpperCase() + this.name.slice(1);
		}
		if (this.step == null) {
			this.step = 1;
		}
		if (this.timeDurationPicker.inputDisabled != null) {
			this.inputDisabled = this.timeDurationPicker.inputDisabled;
		}
		if (this.inputDisabled == null) {
			this.inputDisabled = true;
		}
		if (this.min == null) {
			this.min = this.timeDurationPicker.supportedUnits[this.name].min;
		}
		if (this.max == null) {
			this.max = this.timeDurationPicker.supportedUnits[this.name].max;
		}
	}

	private increaseValue(): void {
		let currentValue = this.value;
		if (currentValue < this.max) {
			currentValue = currentValue + this.step;
		} else {
			currentValue = this.min;
		}
		this.value = currentValue;
		this.updateValue();
	}

	private decreaseValue(): void {
		let currentValue = this.value;
		if (currentValue > this.min) {
			currentValue = currentValue - this.step;
		} else {
			currentValue = this.max;
		}
		this.value = currentValue;
		this.updateValue();
	}

	private checkValue(event: any) {
		let currentValue = event.target.value;
		if (currentValue < this.min) {
			currentValue = this.min;
		} else if (currentValue > this.max) {
			currentValue = this.max;
		}
		if (currentValue !== parseInt(currentValue)) {
			currentValue = Math.round(currentValue);
		}
		event.target.value = currentValue;
		this.updateValue();
	}

	public updateValue() {
		this.onChange.emit(this.getValue());
		this.timeDurationPicker.updateValue();
	}

	public getValue(): number {
		return this.value;
	}
}
