import i18n from 'i18next';

declare global {
  var i18next: typeof i18n;
  namespace Cypress {
    interface Chainable {
      loadGame(saveFile: string): Chainable
    }
  }
}
