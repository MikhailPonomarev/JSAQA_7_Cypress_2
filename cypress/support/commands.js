const adminLoginPage = require('../fixtures/adminLoginPage.json')

Cypress.Commands.add('loginToAdmin', (email, password) => { 
    cy.get(adminLoginPage.emailInput).type(email);
    cy.get(adminLoginPage.passInput).type(password);
    cy.get(adminLoginPage.submitButton).click();
});

Cypress.Commands.add('createNewHall', (hallName) => {
    cy.contains('Создать зал').click();
    cy.get('div.popup__wrapper label input').type(hallName);
    cy.contains('Добавить зал').click();
});

Cypress.Commands.add('setFilmSchedule', (startTime, hallName) => {
    let movie = 'About Jenkins';
    let target = '.conf-step__seances > div:nth-child(1) > div';

    const dataTransfer = new DataTransfer();
    cy.contains(movie).trigger('dragstart', {
        dataTransfer
    });
    cy.get(target).trigger('drop', {
        dataTransfer
    });
    cy.contains(movie).trigger('dragend');

    cy.get('[name="start_time"]').type(startTime);
    cy.get('[data-event="seance_add"]').click();
    cy.get(`#start-sales [value=${hallName}]`).click();
    cy.contains('Открыть продажу билетов').click();
});

Cypress.Commands.add('stopSales', (hallName) => {
    cy.get(`#start-sales [value=${hallName}]`).click();
    cy.contains('Закрыть продажу билетов').click();
});

Cypress.Commands.add('deleteHall', (hallName) => {
    cy.get(`[data-hall-name="${hallName}"]`).click();
});