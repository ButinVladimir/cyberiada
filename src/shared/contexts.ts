import { createContext } from "@lit/context";
import { Layout } from "./types";

export const layoutContext = createContext<Layout>(Symbol('LAYOUT_CONTEXT'));