// components/redux-provider.ts
"use client";

import { Provider } from "react-redux";
import { store } from "../Store/store"; // Adjust the import path based on your directory structure

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
