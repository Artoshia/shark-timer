import { TimeControlsComponent } from './time-controls.component'
import { TimeDisplayComponent } from '../time-display/time-display.component'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('TimeControlsComponent', () => {
  it('should mount', () => {
    cy.mount(TimeControlsComponent, {
      declarations: [TimeDisplayComponent],
    })
  })

  it('should display a start button', () => {
    cy.mount(TimeControlsComponent)
    cy.get(".start-button").should("exist")
  })

  it('should display a reset button', () => {
    cy.mount(TimeControlsComponent)
    cy.get(".reset-button").should("exist")
  })

  it('should display a stop button when clicked', () => {
    cy.mount(TimeControlsComponent)
    cy.get(".start-button").click().contains("Stop")
  })

  it("volume button should appear when in timer mode", () => {
    cy.mount(TimeControlsComponent, {
      componentProperties: {
        timerActive: true
      },
      imports: [MatIconModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatTabsModule, MatToolbarModule]
    })
    cy.get("mat-icon").should("exist")
  })
})