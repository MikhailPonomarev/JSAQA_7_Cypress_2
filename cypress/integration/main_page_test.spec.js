const mainPage = require('../fixtures/pages/bookingMainPage.json')

it('Should open app main page', () => {
    cy.visit('/');
    cy.get(mainPage.pageTitle).should('be.visible');
    cy.get(mainPage.daysOfWeek).should('have.length', 7);
});