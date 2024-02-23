import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, Subject, timer } from 'rxjs';
import { filter, map, scan, switchMap, takeUntil } from 'rxjs/operators';

import { TimeControlsComponent } from '../time-controls/time-controls.component';

@Component({
	selector: 'app-stopwatch',
	templateUrl: './stopwatch.component.html',
	styleUrl: './stopwatch.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StopwatchComponent implements OnInit, OnDestroy {
	@Input() controls: TimeControlsComponent;
	@Input() active: boolean;

	time$: Observable<number>;
	start$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	interval$: Observable<number>;
	reset$: Subject<void> = new Subject<void>();
	destroyed$: Subject<void> = new Subject<void>();

	constructor(private changeDetector: ChangeDetectorRef) { }

	ngOnInit() {
		this.interval$ = timer(0, 10);
		this.resetTimer();

		this.controls.stopwatchReset$.subscribe(() => {
			this.resetTimer();
			this.controls.stopClocks();
			this.changeDetector.markForCheck(); //marks that the timer has reset and that the component has updated.
		});
	}

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	resetTimer() {
		this.reset$.next(); //restarts the timer.

		//comment to keep it clear.
		this.time$ = this.controls.stopwatchStart$.pipe(
			filter(() => this.active),
			switchMap(isRunning => (isRunning ? this.interval$.pipe(map(()=>10)) : EMPTY)), //if it is running, it will emit the interval, else it will emit an empty observable, which ends the event.
			scan((currentTime, interval) => currentTime + interval, 0),
			takeUntil(this.reset$) //keep running until it resets.
		);
	}

}
