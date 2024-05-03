let globalSheets: CSSStyleSheet[] | null = null;

function getGlobalSheets(): CSSStyleSheet[] {
  if (globalSheets) {
    return globalSheets;
  }

  globalSheets = Array.from(document.styleSheets)
    .map(globalSheet => {
      const sheet = new CSSStyleSheet();
      const css = Array.from(globalSheet.cssRules).map(rule => rule.cssText).join(' ');
      sheet.replaceSync(css);
      return sheet;
    });

  return globalSheets;
}

export function addCssSheets(shadowRoot: ShadowRoot) {
  shadowRoot.adoptedStyleSheets.push(...getGlobalSheets());
}
