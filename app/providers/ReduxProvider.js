"use client";

import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "../redux/store";

import { CircularProgress } from "@mui/material";

export default function ReduxProvider({ children }) {
  //return <Provider store={store}>{children}</Provider>;

  return (
    <Provider store={store}>
      {/* PersistGate ensures that the app waits for state rehydration */}
      <PersistGate
        loading={
          <div className="w-full h-full flex-grow flex items-center justify-center py-6 text-black lg:py-12">
            <CircularProgress color="inherit" size={40} />
          </div>
        }
        persistor={persistor}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
