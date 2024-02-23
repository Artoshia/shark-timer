describe('Site view Initial', () => {
  it('Able to visit Timer Page with automatic redirection.', () => {
    cy.visit('/')
    cy.url().should('include', '/timer')

    cy.get(".time-display-digit").should("exist").should("have.length", 2).should("have.text", "0500")
    cy.get(".start-button").should("exist").should("have.text", "Start")
    cy.get(".reset-button").should("exist").should("have.text", "Reset")
    cy.get('#timer-reset > mat-icon').should("exist").should("have.text", "volume_up")
    
    cy.get("#timer").should("exist").should("have.text", "hourglass_empty")
    cy.get("#stopwatch").should("exist").should("have.text", "timer")

    
  })

  it('Able to visit Stopwatch Page', () => {
    cy.visit('/stopwatch')
    cy.url().should('include', '/stopwatch')

    cy.get(".time-display-digit").should("exist").should("have.length", 2).should("have.text", "0000")
    cy.get(".start-button").should("exist").should("have.text", "Start")
    cy.get(".reset-button").should("exist").should("have.text", "Reset")

    cy.get("#timer").should("exist").should("have.text", "hourglass_empty")
    cy.get("#stopwatch").should("exist").should("have.text", "timer")
  })
})


function ChangeTime(Hours: number, Minutes: number, Seconds: number) {
  cy.get("#time-display").click()
  cy.get("#setting-display").find('[placeholder="Hours"]').clear().type(String(Hours))
  cy.get("#setting-display").find('[placeholder="Minutes"]').clear().type(String(Minutes))
  cy.get("#setting-display").find('[placeholder="Seconds"]').clear().type(String(Seconds))
  cy.get("#setting-display").find("button").contains("Done").click()
}

describe('Timer page working', () => {
  it('Able to visit Timer page via tab from stopwatch.', () => {
    cy.visit('/stopwatch')
    cy.url().should('include', '/stopwatch')
    cy.get("mat-tab-group").contains("Timer").click()
    
    //way to check if the page is correct.
    cy.get(".time-display-digit").should("exist").should("have.length", 2).should("have.text", "0500")
    cy.get(".start-button").should("exist").should("have.text", "Start")
    cy.get(".reset-button").should("exist").should("have.text", "Reset")
    cy.get('#timer-reset > mat-icon').should("exist").should("have.text", "volume_up")

  })

  it('Able to visit Stopwatch page via tab from timer.', () => {
    cy.visit('/')
    cy.url().should('include', '/timer')
    cy.get("mat-tab-group").contains("Stopwatch").click()
    
    //way to check if the page is correct.
    cy.get(".time-display-digit").should("exist").should("have.length", 2).should("have.text", "0000")
    cy.get(".start-button").should("exist").should("have.text", "Start")
    cy.get(".reset-button").should("exist").should("have.text", "Reset")
    cy.contains("volume_up").should("not.exist") //confirms that the volume button is not present.
  })

  it('Able to start and stop the timer.', () => {
    cy.visit('/')
    cy.get(".start-button").click().contains("Stop")
    cy.get(".time-display-digit").should("have.text", "0459")
    cy.get(".start-button").click().contains("Start")
    cy.get(".time-display-digit").should("have.text", "0459")
  })

  it('Able to reset the timer.', () => {
    cy.visit('/')
    cy.get(".start-button").click().contains("Stop")
    cy.get(".time-display-digit").should("have.text", "0459")
    cy.get(".reset-button").click()
    cy.get(".time-display-digit").should("have.text", "0500")
  })

  it('Able to edit the timer & reset it back to its original value', () => {
    cy.visit('/')
    ChangeTime(1,0,0)
    cy.get(".time-display-digit").should("have.text", "0100")
    cy.get(".start-button").click().contains("Stop")
    cy.get(".time-display-digit").should("have.text", "5959")
    cy.get(".reset-button").click()
    cy.get(".time-display-digit").should("have.text", "0100")
  })

  it('Able to give the timer invalid values and it reset back to neutral values', () => {
    cy.visit('/')
    ChangeTime(-100,-100,-100)
    cy.get(".time-display-digit").should("have.text", "00")
  })

  it('Able to toggle the alarm sound.', () => {
    cy.visit('/')
    cy.get("#timer-reset > mat-icon").contains("volume_up").click({force: true})
    cy.get("#timer-reset > mat-icon").contains("volume_off").click({force: true})
  })

  it('Able to finish timer', () => {
    cy.visit('/')
    ChangeTime(0,0,1)
    cy.get(".start-button").click().contains("Stop")
    cy.wait(2000)
    cy.get(".time-display-digit").should("have.text", "00")
    cy.get(".start-button").should("have.text", "Ok")
  })


})


describe('Stopwatch page working', () => {
  it('Able to visit Stopwatch page via tab from timer.', () => {
    cy.visit('/')
    cy.url().should('include', '/timer')
    cy.get("mat-tab-group").contains("Stopwatch").click()
    
    //way to check if the page is correct.
    cy.get(".time-display-digit").should("exist").should("have.length", 2).should("have.text", "0000")
    cy.get(".start-button").should("exist").should("have.text", "Start")
    cy.get(".reset-button").should("exist").should("have.text", "Reset")
    cy.contains("volume_up").should("not.exist") //confirms that the volume button is not present.
    cy.get(".time-display-small-digit").should("exist").should("have.length", 1).should("have.text", "00")
  })

  it('Able to visit Timer page via tab from stopwatch.', () => {
    cy.visit('/stopwatch')
    cy.url().should('include', '/stopwatch')
    cy.get("mat-tab-group").contains("Timer").click()
    
    //way to check if the page is correct.
    cy.get(".time-display-digit").should("exist").should("have.length", 2).should("have.text", "0500")
    cy.get(".start-button").should("exist").should("have.text", "Start")
    cy.get(".reset-button").should("exist").should("have.text", "Reset")
    cy.get('#timer-reset > mat-icon').should("exist").should("have.text", "volume_up")

  })

  it('Able to start and stop the stopwatch.', () => {
    cy.visit('/stopwatch')
    cy.get(".start-button").click().contains("Stop")
    cy.get(".time-display-small-digit").contains("5")  //checks if capable of measuring half seconds.
    cy.get(".time-display-digit").contains("01")

    cy.get(".start-button").click().contains("Start")
    cy.get(".time-display-digit").contains("01")
  })

  it('Able to reset the stopwatch.', () => {
    cy.visit('/stopwatch')
    cy.get(".start-button").click().contains("Stop")
    cy.get(".time-display-small-digit").contains("5") //checks if capable of measuring half seconds.
    cy.get(".time-display-digit").contains("01")
    cy.get(".reset-button").click()
    cy.get(".time-display-digit").should("have.text", "0000")
  })

  it("Able to reach 1 minute", () => {
    cy.visit('/stopwatch')
    cy.get(".start-button").click().contains("Stop")
    cy.get(".time-display-small-digit").contains("5")
    cy.wait(60000)
    cy.get(".time-display-minutes").should("have.text", "01")
  })

  it("Able to reach 1 hour", () => {
    cy.visit('/stopwatch')
    cy.get(".start-button").click().contains("Stop")
    cy.get(".time-display-small-digit").contains("5")
    cy.wait(3600000)
    cy.get(".time-display-hours").contains("01")
  })
})

