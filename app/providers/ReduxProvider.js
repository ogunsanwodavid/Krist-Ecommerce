"use client";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../redux/store";

import OnboardingLoader from "../components/OnboardingLoader";

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {/* PersistGate ensures that the app waits for state rehydration */}
      <PersistGate loading={<OnboardingLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
