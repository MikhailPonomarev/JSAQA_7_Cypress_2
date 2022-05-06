const bookingPage = require('../fixtures/pages/bookingMainPage.json')
const testData = require('../fixtures/data/bookingTestData.json')
const adminAuthData = require('../fixtures/data/adminAuthData.json')
const seats = require('../fixtures/data/seats.json')
const {getSeatSelector} = require("../util.js")

before(() => {
    cy.visit('/admin');
    cy.loginToAdmin(adminAuthData.validEmail, adminAuthData.validPass);
    cy.createNewHall(testData.hallName);
    cy.setFilmSchedule(testData.movieStartTime, testData.hallName);
});

beforeEach(() => {
    cy.visit('/');
});

after(() => {
    cy.visit('/admin');
    cy.loginToAdmin(adminAuthData.validEmail, adminAuthData.validPass);
    cy.stopSales(testData.hallName);
    cy.deleteHall(testData.hallName);
});

it('Should book one seat', () => {
    cy.get(bookingPage.secondDay).click();
    cy.contains(testData.movieName).contains(testData.movieStartTime).click();
    cy.get(getSeatSelector(seat.row, seat.seat)).click();
    cy.get(bookingPage.acceptButton).click();
    cy.contains('Вы выбрали билеты:').should('be.visible');
    cy.contains('Получить код бронирования').click();
    cy.get(bookingPage.qrCode).should('be.visible');
});

it('Should book multiple seats', () => {
    cy.get(bookingPage.secondDay).click();
    cy.contains(testData.movieName).contains(testData.movieStartTime).click();
    seats.forEach((seat) => {
        cy.get(getSeatSelector(seat.row, seat.seat)).click();
    });
    cy.get(bookingPage.acceptButton).click();
    cy.contains('Вы выбрали билеты:').should('be.visible');
    cy.contains('Получить код бронирования').click();
    cy.get(bookingPage.qrCode).should('be.visible');
});