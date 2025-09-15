import { createContext } from "react";
import type { GlobalContextType } from "../Types/types";

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
