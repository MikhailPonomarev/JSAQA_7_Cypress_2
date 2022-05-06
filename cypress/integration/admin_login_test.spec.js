const selectors = require('../fixtures/pages/adminLoginPage.json')
const authData = require('../fixtures/data/adminAuthData.json')
import '../support/commands'

beforeEach(() => {
    cy.visit('/admin');
});

it('Should login with valid auth data', () => {
    cy.get(selectors.pageTitle).should('be.visible');
    cy.get(selectors.pageSubTitle).should('have.text', 'Администраторррская');
    cy.get(selectors.loginTitle).should('have.text', 'Авторизация');
    cy.loginToAdmin(authData.validEmail, authData.validPass);
    cy.contains('Управление залами').should('be.visible');
    cy.contains('Конфигурация залов').should('be.visible');
    cy.contains('Конфигурация цен').should('be.visible');
    cy.contains('Сетка сеансов').should('be.visible');
    cy.contains('Открыть продажи').should('be.visible');
});

it('Login with false email', () => {
    cy.get(selectors.pageTitle).should('be.visible');
    cy.get(selectors.pageSubTitle).should('have.text', 'Администраторррская');
    cy.get(selectors.loginTitle).should('have.text', 'Авторизация');
    cy.loginToAdmin(authData.falseEmail, authData.validPass);
    cy.get('body').should('have.text', "Ошибка авторизации!")
});

it('Login with false pass', () => {
    cy.get(selectors.pageTitle).should('be.visible');
    cy.get(selectors.pageSubTitle).should('have.text', 'Администраторррская');
    cy.get(selectors.loginTitle).should('have.text', 'Авторизация');
    cy.loginToAdmin(authData.validEmail, authData.falsePass);
    cy.get('body').should('have.text', "Ошибка авторизации!")
});