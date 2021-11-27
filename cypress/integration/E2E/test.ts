describe('My First Test', () => {

  before(() => {
    cy.task('db:seed')
  })

  it('Visits the app root url', () => {
    cy.visit('/')
    cy.get('[data-cy=email]').clear()
    cy.get('[data-cy=password]').clear()
    cy.get('[data-cy=email]').type("sean.maxwell@gmail.com")
    cy.get('[data-cy=password]').type("Password@1")
    cy.get('[data-cy=submit]').click()
    cy.url().should('be.equal', `${Cypress.config().baseUrl}/restricted`)
    cy.get('[data-cy=logout]').click();
    cy.url().should('be.equal', `${Cypress.config().baseUrl}/`)
    cy.visit('/restricted')
    cy.url().should('be.equal', `${Cypress.config().baseUrl}/`)
  })
});