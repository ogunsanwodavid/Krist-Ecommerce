"use client";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../redux/store";

import ReduxPersistLoader from "../components/ReduxPersistLoader";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {/* PersistGate ensures that the app waits for state rehydration */}
      <PersistGate loading={<ReduxPersistLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
