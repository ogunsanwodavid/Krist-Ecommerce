"use client";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

//import storage from "redux-persist/lib/storage";

// Custom noop storage to be used in SSR or non-browser environments
const createNoopStorage = () => {
  return {
    getItem: () => Promise.resolve(null),
    setItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
  };
};

// Use WebStorage (localStorage) if the code is running in the browser
// Fallback to noopStorage for SSR or when window is undefined
const storageEngine =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storageEngine;
