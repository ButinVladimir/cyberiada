import { msg } from "@lit/localize";
import { ItemCategory } from "@shared/types";

export const CATEGORIES: Record<ItemCategory, () => string> = {
  programs: () => msg('Programs'),
  cloneTemplates: () => msg('Clone templates'),
};
