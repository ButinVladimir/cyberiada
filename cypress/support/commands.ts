import { LOCAL_STORAGE_KEY } from '../../src/state/app/constants';

/// <reference types="cypress" />

Cypress.Commands.add('loadGame', function (saveFile: string) {
  cy.session(
    [saveFile],
    () => {
      cy.readFile(saveFile, 'utf8').then((data) => {
        cy.visit('index.html', {
          onBeforeLoad: () => {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, data);
          },
        });
      });
    },
  );
});
