/// <reference types="cypress" />

describe('App', () => {
  before(() => {
    cy.wrap(1000).as('loadingTime');
  });

  beforeEach(() => {
    cy.loadGame('cypress/fixtures/basic-save.txt');
    cy.visit('index.html');
  });

  it('loads correctly', () => {
    cy.wait(1000);
    cy.get('ca-app-root').should('be.visible');
  });
});