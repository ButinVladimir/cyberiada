export interface IPropertyDisplayer {
  sectionKey: string;
  paramKey: string;
  getValue: () => number;
}

export interface IPropertySectionDisplayer {
  sectionKey: string;
  properties: {
    paramKey: string;
    getValue: () => number;
  }[];
}
