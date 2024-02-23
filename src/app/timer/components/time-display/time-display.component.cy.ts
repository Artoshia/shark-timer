import { TimeDisplayComponent } from './time-display.component'

// This is a test file for the TimeDisplayComponent, to be run with the Cypress testing framework.
/*
This tests that the stop watch component can correctly run and calculate and display the desired timing when supplied with a time value.
*/

describe('TimeDisplayComponent', () => {
  it('should mount', () => {
    cy.mount(TimeDisplayComponent, {
      componentProperties: {
        time: 0
      }
    })
  })

  it('should display 00s 00', () => {
    cy.mount(TimeDisplayComponent, {
      componentProperties: {
        time: 0
      }
    })
    cy.get(".time-display-digit").should("have.text", "0000")
  })

  it('should display 01s 00', () => {
    cy.mount(TimeDisplayComponent, {
      componentProperties: {
        time: 1000
      }
    })
    cy.get(".time-display-digit").should("have.text", "0100")
  })

  it('should display 05m 00s 00', () => {
    cy.mount(TimeDisplayComponent, {
      componentProperties: {
        time: 5*60*1000
      }
    })
    cy.get(".time-display-digit").should("have.text", "050000")
  })

  it('should display 10h 00m 00s 00', () => {
    cy.mount(TimeDisplayComponent, {
      componentProperties: {
        time: 10*60*60*1000
      }
    })
    cy.get(".time-display-digit").should("have.text", "100000")
  })

  it('should display 34h 50m 35s 78', () => {
    cy.mount(TimeDisplayComponent, {
      componentProperties: {
        time: 125435786
      }
    })
    cy.get(".time-display-digit").should("have.text", "34503578")
  })

  it('should display not a negative number but instead 0', () => {
    cy.mount(TimeDisplayComponent, {
      componentProperties: {
        time: -100
      }
    })
    cy.get(".time-display-digit").should("have.text", "00000000")
  })
})