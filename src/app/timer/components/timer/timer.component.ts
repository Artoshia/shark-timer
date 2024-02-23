import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { filter, map, scan, startWith, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';

import { TimeDisplayComponent } from '../time-display/time-display.component';
import { TimeControlsComponent } from '../time-controls/time-controls.component';


@Component({
	selector: 'app-timer',
	templateUrl: './timer.component.html',
	styleUrl: './timer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent implements OnInit, OnDestroy {
	@ViewChild('timeDisplay', { static: true }) timeDisplay: TimeDisplayComponent;
	@Input() controls: TimeControlsComponent;
	@Input() active: boolean;

	time$: Observable<number>;

	percent$: Observable<number>;
	start$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	interval$: Observable<number>;
	reset$: Subject<void> = new Subject<void>();
	destroyed$: Subject<void> = new Subject<void>();

	startTime: number = 5 * 60 * 1000;

	constructor(private cd: ChangeDetectorRef) { }

	ngOnInit() {
	this.interval$ = timer(0, 10);

	this.controls.timerReset$.subscribe(() => {
		this.resetTimer(this.startTime);
		this.controls.stopClocks();
		this.cd.markForCheck();
	}); //when the reset button is clicked, it will reset the timer.

	this.timeDisplay.settingTime$.pipe(
		filter(isSettingTime => isSettingTime),
	).subscribe(() => this.controls.stopClocks()); //if it is setting time, it will stop the timer.

	this.controls.timerStart$.pipe(
		filter(isStartingTimer => isStartingTimer),
	).subscribe(() => this.timeDisplay.endSetTime()); //if it is starting the timer, it will end the time setting.

	}

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	resetTimer(startTime: number) {
	this.reset$.next();
	this.controls.finishedTimer(false);
	//commenting this due to the not so obvious way it functions.
	this.time$ = this.controls.timerStart$.pipe(//on the start event.
		filter(() => this.active), //checks if the timer is active.
			switchMap(isActive => (isActive ? this.interval$.pipe(map(()=>10)) : EMPTY)), //if the timer is active, it will start the interval, otherwise returns an empty observable which finishes timer countdown.
			scan((currentTime, interval) => currentTime - interval, startTime), //subtracts the time passed from the current time.
			startWith(startTime), //emit the new starting time.
			tap(currentTime => { //checks if the time is 0, if it is, it will end the timer.
			if (currentTime === 0) {
				this.controls.finishedTimer(true);
			}
		}),
		takeUntil(this.reset$), //ends the timer when the reset button is clicked.
		takeWhile(val => val >= 0), //ends the timer when the time is 0.
	);

	this.percent$ = this.time$.pipe( //when the time is updated, it will emit the percentage of the time left.
			map(currentTime => Math.min(Math.max((currentTime / startTime) * 100, 0), 100)), //clamped to avoid weird values.
		);
	}

	setTime(startTime: number) {
		this.startTime = startTime;
		this.resetTimer(this.startTime);
	}
}
