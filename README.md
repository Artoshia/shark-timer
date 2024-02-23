# SharkTimer

Reformatted by Liam to be production ready.

This is a small app that implements a timer/stopwatch widget as an Angular component, similar to what you'll see in the results of a Google search for either "[stopwatch](https://www.google.com/search?q=stopwatch)" or "[timer](https://www.google.com/search?q=timer)"

Grab the code and refactor it so that it meets your standard for production ready code.

You do not need to keep the existing code or project structure.

The only requirement is that it maintains basic the functionality of a timer/stopwatch, and that it meets your standards!

## Original Output Example

### Timer

![page image](timer.gif?raw=true)

### Stopwatch

![page image](stopwatch.gif?raw=true)

## !!!IMPORTANT

To be able to run & setup this program
Use latest stable Node release [Node.js](https://nodejs.org/en) (if you have nvm installed, use nvm use 20.11.1)
Use latest stable Angular-cli release [Angular-CLI](https://github.com/angular/angular-cli/releases)

## Getting started

Fork + clone this repo and run `npm install` in the root directory of the repo.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npx cypress open` to execute the unit tests via [Cypresss](https://github.com/cypress-io/cypress-documentation).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypresss](https://github.com/cypress-io/cypress-documentation)..

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## All improvements

- Need to make it easier for developers to keep maintaining project, therefore going to upgrade and rewrite the project from scratch. This also gives it more security and more chance to upgrade in the future.
- Using Cypress instead of Protractor for e2e testing & component testing due to protractor being deprecated. This replaces jasmine.
- Changed name of timer-controls & timer-page to time-controls & time-page to be more semantically correct, and not to confuse with timer functionality, since they both operate on both timer & stopwatch.
- Certain things were not properly initialised and were falsely being accused of being null by TypeScript not being smart enough to understand the filter function in the Observable, so had to manually adjust code to force typescript to understand that it will never be null.
- Certain variables were not appropriately named, converted over to make more sense to the code.
- Some out of date functions were used, so used the not deprecated format.
- Added a visual display to show to the user what their inputs meant for Hours, Minutes, Seconds...
- Renamed all "time" functionality functions to be more generic allowing it to be easier upgraded without inferring a particular name in thought, the word "Clock" refers to all "time" functions.
- Removed garbage time init value.
- Upgraded padding system from numbers to be dynamic and to use a ESM 2017 padStart function, also converted over to string to display instead of numbers.
- Added comments to not super clear code.
- Improved testing components, and added proper e2e testing.
