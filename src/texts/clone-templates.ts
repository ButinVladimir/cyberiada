import { msg } from '@lit/localize';
import { CloneTemplateName } from '@state/company-state';

interface ICloneTemplateTexts {
  title: () => string;
  overview: () => string;
}

export const CLONE_TEMPLATE_TEXTS: Record<CloneTemplateName, ICloneTemplateTexts> = {
  [CloneTemplateName.anthrodrone]: {
    title: () => msg('Anthrodrone'),
    overview: () =>
      msg(`Leftover biomass fused with crude implants.
Can do everything but without outstanding results.`),
  },
};
