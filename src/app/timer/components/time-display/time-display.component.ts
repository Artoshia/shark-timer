import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-time-display',
	templateUrl: './time-display.component.html',
	styleUrl: './time-display.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeDisplayComponent implements OnInit {
	private hourInMs = 3600000;
	private minuteInMs = 60000;
	private secondInMs = 1000;
	private numberPadding = 2;

	@Input() time: number;
	@Input() showHundriths: boolean = true;
	@Input() canSetTime: boolean = false;

	@Output() setTime = new EventEmitter<number>();

	settingTime$ = new BehaviorSubject<boolean>(false);
	inputHours: number;
	inputMinutes: number;
	inputSeconds: number;

	constructor() { }

	ngOnInit() {
	}

	inputChange(hours: number, minutes: number, seconds: number) {
		const timeVal = hours * this.hourInMs + minutes * this.minuteInMs + seconds * this.secondInMs;
		this.setTime.emit(timeVal);
	}

	startSetTime() {
		if (this.canSetTime) {
			this.settingTime$.next(true);
			this.inputHours = this.hours;
			this.inputMinutes = this.minutes;
			this.inputSeconds = this.seconds;
		}
	}
	endSetTime() {
		this.settingTime$.next(false);
	}

	get hours(): number {
		return Math.floor(this.time / this.hourInMs);
	}
	get minutes(): number {
		return Math.floor((this.time / this.minuteInMs) % 60);
	}
	get seconds(): number {
		return Math.floor((this.time / this.secondInMs) % 60);
	}
	get cSeconds(): number {
		return Math.floor((this.time / 10) % 100);
	}

	padNumber(num: number, isSeconds: boolean | void): string {
		
		if (!num && !isSeconds) {
			return "";
		}

		num = Math.max(num, 0) //ensures that the number is not negative.
		
		return String(num).padStart(this.numberPadding, "0");
	}

	get hoursDigits(): string {
		return this.padNumber(this.hours);
	}
	get minutesDigits(): string {
		return this.padNumber(this.minutes);
	}
	get secondsDigits(): string {
		return this.padNumber(this.seconds, true);
	}
	get cSecondsDigits(): string {
		return this.padNumber(this.cSeconds, true);
	}




}
