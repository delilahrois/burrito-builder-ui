describe('Order form user flow', () => {

  beforeEach(() => {

    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {fixture: 'orders'})
    cy.visit('http://localhost:3000')

  })

  it('should render a text input for order name', () => {

      

  })

  it('should render buttons to add ingredients to order', () => {


  })

  it('should allow user to add their name to new order form', () => {


  })

  it('should allow user to select ingredients', () => {


  })

  it('should allow user to submit new order', () => {



  })

  it('should not allow submission if form is incomplete', () => {


  })

  it('should render new order on the page', () => {


  })


})