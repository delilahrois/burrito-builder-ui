describe('App tests', () => {

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'orders'})
    cy.visit('http://localhost:3000')

  })

  it('should be able to visit the site', () => {

    cy.url().should('eq', 'http://localhost:3000/')

  })

  it('should render a header', () => {

    cy.get('h1').contains('Burrito Builder')

  })

  it('should render a grid of order elements', () => {

    cy.get('section[class="order-container"]').should('exist')
    cy.get('div[class="order"]').should('exist')

  })

  it('should render a form and submission button', () => {

    cy.get('form[class="order-form"]').should('exist')
    cy.get('button[class="submit-btn"]').contains('Submit Order').should('exist')

  })

})