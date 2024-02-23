import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

interface routeViews {
	[key: string]: number;
}
const routePaths: routeViews = { 'timer': 0, 'stopwatch':1};

@Component({
	selector: 'app-time-page',
	templateUrl: './time-page.component.html',
	styleUrl: './time-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TimePageComponent implements OnInit, OnDestroy {
	selectedTabIndex$ = new BehaviorSubject<number>(0);
	destroyed$: Subject<void> = new Subject<void>();

	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.data.pipe(
			filter(routeData => !!routeData),
			takeUntil(this.destroyed$),
		).subscribe(routeData => {
			
			//reformatted for easier updating.
			const currentRoute: string = routeData['view'];
			const path: number = routePaths[currentRoute];

			this.selectedTabIndex$.next(path);
		});

	}

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	tabChange(selectedTabIndex: number) {
		this.selectedTabIndex$.next(selectedTabIndex);
	}
}
