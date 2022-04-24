const selectors = require('../fixtures/main_page_selectors.json')
it('Should open app main page', () => {
    cy.visit('/');
    cy.get(selectors.pageTitle).should('be.visible');
    cy.get(selectors.daysOfWeek).should('have.length', 7);
});