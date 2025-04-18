declare global {
  namespace Cypress {
    interface Chainable {
      loadGame(saveFile: string): Chainable;
    }
  }
}
