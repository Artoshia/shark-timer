import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TimerComponent } from './timer/components/timer/timer.component';
import { TimeControlsComponent } from './timer/components/time-controls/time-controls.component';
import { StopwatchComponent } from './timer/components/stopwatch/stopwatch.component';
import { TimeDisplayComponent } from './timer/components/time-display/time-display.component';
import { TimePageComponent } from './timer/pages/time-page/time-page.component';


// material themes
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';



@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    TimeControlsComponent,
    StopwatchComponent,
    TimeDisplayComponent,
    TimePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatTabsModule,
    MatToolbarModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
