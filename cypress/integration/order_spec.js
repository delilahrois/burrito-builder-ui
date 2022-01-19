describe('Order form user flow', () => {

  beforeEach(() => {

    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: 'orders'})
    cy.visit('http://localhost:3000')

  })

  it('should render a text input for order name', () => {

    cy.get('input[type="text"][name="name"]').should('exist')

  })

  it('should render buttons to add ingredients to order', () => {

    cy.get('button[name="beans"]').should('exist')
    cy.get('button[name="steak"]').should('exist')
    cy.get('button[name="carnitas"]').should('exist')
    cy.get('button[name="sofritas"]').should('exist')
    cy.get('button[name="lettuce"]').should('exist')
    cy.get('button[name="queso fresco"]').should('exist')
    cy.get('button[name="pico de gallo"]').should('exist')
    cy.get('button[name="hot sauce"]').should('exist')
    cy.get('button[name="guacamole"]').should('exist')
    cy.get('button[name="jalapenos"]').should('exist')
    cy.get('button[name="cilantro"]').should('exist')
    cy.get('button[name="sour cream"]').should('exist')

  })

  it('should allow user to add their name to new order form', () => {

    cy.get('input[type="text"][name="name"]').type('Rita')
    cy.get('input[type="text"][name="name"]').should('have.value', 'Rita')

  })

  it('should allow user to select ingredients and display selections', () => {

    cy.get('button[name="beans"]').click()
    cy.get('button[name="queso fresco"]').click()
    cy.get('button[name="cilantro"]').click()
    cy.get('p[class="current-order"]').contains('Order: beans, queso fresco, cilantro')

  })

  it('should allow user to submit new order', () => {

    cy.get('input[type="text"][name="name"]').type('Rita')
    cy.get('button[name="beans"]').click()
    cy.get('button[name="queso fresco"]').click()
    cy.get('button[name="cilantro"]').click()
    cy.get('p[class="current-order"]').contains('Order: beans, queso fresco, cilantro')
    cy.get('button[class="submit-btn"]').contains('Submit Order').click()

  })

  it('should not allow submission if ingredients are not selected', () => {

    cy.get('input[type="text"][name="name"]').type('Rita')
    cy.get('button[class="submit-btn"]').contains('Submit Order').click()
    cy.get('p[class="current-order"]').contains('Order: Nothing selected')
    cy.get('div[class="order"][key="Rita"]').should('not.exist')

  })

  it('should not allow submission if name is not given', () => {

    cy.get('button[name="beans"]').click()
    cy.get('button[name="queso fresco"]').click()
    cy.get('button[name="cilantro"]').click()
    cy.get('button[class="submit-btn"]').contains('Submit Order').click()
    cy.get('div[class="order"][key="Rita"]').should('not.exist')

  })

  it('should be able to send a new order', () => {

    cy.server()
    cy.get('input[type="text"][name="name"]').type('Rita')
    cy.get('button[name="beans"]').click()
    cy.get('button[name="queso fresco"]').click()
    cy.get('button[name="cilantro"]').click()
    cy.get('p[class="current-order"]').contains('Order: beans, queso fresco, cilantro')
    cy.get('button[class="submit-btn"]').contains('Submit Order').click()

    cy.intercept('http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      body: {
        "id": 3,
        "ingredients": ["steak", "pico de gallo", "lettuce", "carnitas", "queso fresco", "jalapeno"],
        "name": "Rita" 
      }
    })
  })


})