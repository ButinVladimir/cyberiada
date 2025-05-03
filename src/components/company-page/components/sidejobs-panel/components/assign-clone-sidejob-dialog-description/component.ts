import { css, html, nothing } from 'lit';
import { localized } from '@lit/localize';
import { customElement } from 'lit/decorators.js';
import { BaseComponent } from '@shared/base-component';
import { SIDEJOB_TEXTS } from '@texts/index';
import { SCREEN_WIDTH_POINTS, subSectionTitleStyle } from '@shared/styles';
import { type ISidejob } from '@state/company-state';
import { consume } from '@lit/context';
import { temporarySidejobContext } from '../assign-clone-sidejob-dialog/contexts';
import { AssignCloneSidejobDialogDescriptionController } from './controller';

@localized()
@customElement('ca-assign-clone-sidejob-dialog-description')
export class AssignCloneSidejobDialogDescription extends BaseComponent<AssignCloneSidejobDialogDescriptionController> {
  static styles = [
    subSectionTitleStyle,
    css`
      :host {
      }

      p.description {
        margin: 0;
      }


      @media (min-width: ${SCREEN_WIDTH_POINTS.TABLET}) {
      }
    `,
  ];

  protected controller: AssignCloneSidejobDialogDescriptionController;

  @consume({ context: temporarySidejobContext, subscribe: true })
  private _sidejob?: ISidejob;

  constructor() {
    super();

    this.controller = new AssignCloneSidejobDialogDescriptionController(this);
  }

  render() {
    if (!this._sidejob) {
      return nothing;
    }
    
    return html`
      <p class="description">${SIDEJOB_TEXTS[this._sidejob.sidejobName].overview()}</p>
    `;
  }
}
