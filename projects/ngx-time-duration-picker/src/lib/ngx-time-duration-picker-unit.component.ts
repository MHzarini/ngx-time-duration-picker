import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	Host,
	Inject,
	forwardRef,
} from "@angular/core";
import { NgxTimeDurationPickerComponent } from "./ngx-time-duration-picker.component";

@Component({
	selector: "ngx-time-duration-picker-unit",
	template: `
		<div class="flex-container">
			<a
				(mousedown)="increaseValue()"
				long-press
				(onLongPressing)="longIncreaseValue()"
			>
				&#708;
			</a>
			<div>
				<input
					[(ngModel)]="value"
					[disabled]="inputDisabled"
					(blur)="checkValue($event)"
					type="number"
					min="{{ min }}"
					max="{{ max }}"
				/>
				<span *ngIf="label">{{ label }}</span>
			</div>
			<a
				(mousedown)="decreaseValue()"
				long-press
				(onLongPressing)="longDecreaseValue()"
			>
				&#709;
			</a>
		</div>
	`,
	styles: [
		`
			input[type="number"]::-webkit-inner-spin-button,
			input[type="number"]::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
			input[type="number"] {
				text-align: center;
				-moz-appearance: textfield;
			}
			.flex-container {
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
			}
			input {
				width: 30px;
				height: 26px;
				margin-right: 2px;
				margin-left: 2px;
				padding: 0;
				font-size: 13px;
			}
		`,
	],
})
export class NgxTimeDurationPickerUnitComponent implements OnInit {
	@Input() name: string;
	@Input() label: string;
	@Input() max: number;
	@Input() min: number;
	@Input() step: number;
	@Input() inputDisabled: boolean;

	@Output() OnChange: EventEmitter<number>;
	@Input() value: number = 0;
	//this variable will be increasing as the user long presses
	stepVal: number = 1;

	constructor(
		@Host()
		@Inject(forwardRef(() => NgxTimeDurationPickerComponent))
		public timeDurationPicker: NgxTimeDurationPickerComponent
	) {
		this.OnChange = new EventEmitter();
		// this.value = 0;
	}

	ngOnInit() {
		this.name = this.name.toLocaleLowerCase();
		const supportedUnitsNames = Object.keys(
			this.timeDurationPicker.supportedUnits
		);
		if (supportedUnitsNames.indexOf(this.name) === -1) {
			throw new Error("Unsupported unit: " + this.name);
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

	increaseValue(): void {
		let currentValue = this.value;
		if (currentValue < this.max) {
			currentValue = +currentValue + +this.step;
		} else {
			currentValue = this.min;
		}
		this.value = currentValue;
		this.updateValue();
	}

	decreaseValue(): void {
		let currentValue = this.value;
		if (currentValue > this.min) {
			currentValue = currentValue - this.step;
		} else {
			currentValue = this.max;
		}
		this.value = currentValue;
		this.updateValue();
	}

	checkValue(event: any) {
		let currentValue = parseInt(event.target.value);
		if (currentValue < this.min) {
			currentValue = this.min;
		} else if (currentValue > this.max) {
			currentValue = this.max;
		}
		if (currentValue !== +currentValue) {
			currentValue = Math.round(currentValue);
		}
		event.target.value = currentValue;
		this.value = currentValue;
		this.updateValue();
	}

	public updateValue() {
		this.OnChange.emit(this.getValue());
		this.timeDurationPicker.updateValue();
	}

	public getValue(): number {
		return this.value;
	}

	longIncreaseValue() {
		let currentValue = this.value;
		if (currentValue + this.stepVal <= this.max) {
			currentValue = +currentValue + this.stepVal;
		} else {
			currentValue = this.max;
		}
		if (this.stepVal < 100) {
			this.stepVal += 1;
		} else {
			this.stepVal = 100;
		}
		this.value = currentValue;
		this.updateValue();
	}

	longDecreaseValue() {
		let currentValue = this.value;
		if (currentValue - this.stepVal >= this.min) {
			currentValue = +currentValue - this.stepVal;
		} else {
			currentValue = this.min;
		}
		if (this.stepVal > 1) {
			this.stepVal -= 1;
		} else {
			this.stepVal = 1;
		}
		this.value = currentValue;
		this.updateValue();
	}
}
