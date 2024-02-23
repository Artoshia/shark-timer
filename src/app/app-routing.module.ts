import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimePageComponent } from './timer/pages/time-page/time-page.component';

const routes: Routes = [
  { path: 'timer', component: TimePageComponent, data: { view: 'timer' } },
  { path: 'stopwatch', component: TimePageComponent, data: { view: 'stopwatch' } },
  { path: '**', redirectTo: '/timer' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
