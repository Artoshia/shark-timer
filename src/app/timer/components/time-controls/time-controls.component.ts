import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, ViewChildren } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TimeDisplayComponent } from '../time-display/time-display.component';

@Component({
	selector: 'app-timer-controls',
	templateUrl: './time-controls.component.html',
	styleUrl: './time-controls.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeControlsComponent implements OnInit {
	@ViewChild('alarm', { static: true }) alarmElementRef: ElementRef;
	@ViewChild('timeDisplay', { static: false }) timeDisplay: TimeDisplayComponent;
	@Input() timerActive: boolean;

	timerStart$ = new BehaviorSubject<boolean>(false);
	timerEnd$ = new BehaviorSubject<boolean>(false);
	timerReset$ = new BehaviorSubject<number>(0);

	stopwatchStart$ = new BehaviorSubject<boolean>(false);
	stopwatchReset$ = new Subject<void>();

	alarm: HTMLAudioElement;
	alarmEnabled$ = new BehaviorSubject<boolean>(true);
	alarmSounding$ = new BehaviorSubject<boolean>(false);

	fullScreen$ = new BehaviorSubject<boolean>(false);
	destroyed$: Subject<void> = new Subject<void>();

	constructor() { }

	

	ngOnInit() {
		this.alarm = this.alarmElementRef.nativeElement;

		this.alarmEnabled$.subscribe(isSoundEnabled => {
			if (isSoundEnabled) {
				if (this.alarmSounding$.value) {
					this.alarm.loop = true;
					this.alarm.play();
				}
			} else {
				this.alarm.loop = false;
				this.alarm.pause();
			}
		});
	}

	toggleClocks() {
		if (this.timerActive) {
			if (!this.timerEnd$.value) {
				this.timerStart$.next(!this.timerStart$.value);
			} else {
				this.stopAlarm();
			}
		} else {
			this.stopwatchStart$.next(!this.stopwatchStart$.value);
		}
	}

	startClocks() {
		if (this.timerActive) {
			this.timerStart$.next(true);
		} else {
			this.stopwatchStart$.next(true);
		}
	}

	stopClocks() {
		this.timerStart$.next(false);
		if (this.timerActive) {
			this.timerStart$.next(false);
		} else {
			this.stopwatchStart$.next(false);
		}
	}

	resetClocks() {
		this.stopAlarm();
		if (this.timerActive) {
			this.timerReset$.next(0);
		} else {
			this.stopwatchReset$.next();
		}
	}

	finishedTimer(timerComplete: boolean) {
		this.timerEnd$.next(timerComplete);
		if (timerComplete) {
			this.startAlarm();
		}
	}

	toggleAlarmSound() {
		this.alarmEnabled$.next(!this.alarmEnabled$.value);
	}

	startAlarm() {
		if (this.alarmEnabled$.value && (!this.alarmSounding$.value) && this.timerStart$.value) { //only play the alarm if it is enabled and not in edit mode.
			this.alarmSounding$.next(true);
			this.alarm.play();
		}
	}

	stopAlarm() {
		if (this.alarmSounding$.value) {
			this.alarmSounding$.next(false);
			this.alarm.pause();
		}
	}

	get started() {
		return this.timerActive ? this.timerStart$.value : this.stopwatchStart$.value;
	}
}
