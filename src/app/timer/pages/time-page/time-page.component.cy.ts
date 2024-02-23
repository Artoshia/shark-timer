import { TimePageComponent } from './time-page.component'
import { ActivatedRoute } from '@angular/router';

describe('TimePageComponent', () => {
  it('should mount', () => {
    cy.mount(TimePageComponent, {
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    })
  })
})