import { GameStateManager } from "@state/gameStateManager";

export interface IPropertyDisplayerProps {
  sectionKey: string;
  property: string;
  getValue: () => string;
}

export interface IPropertySectionDisplayerProps {
  sectionKey: string;
  properties: {
    property: string;
    getValue: () => string;
  }[];
}

export interface IComponentWithGameStateManagerProps {
  gameStateManager: GameStateManager;
}
