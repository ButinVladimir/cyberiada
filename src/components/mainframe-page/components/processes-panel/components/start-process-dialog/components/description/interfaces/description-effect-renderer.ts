export interface IDescriptionEffectRenderer {
  renderEffect(): unknown;
  partialUpdate(nodeList: NodeListOf<HTMLParagraphElement>): void;
}
