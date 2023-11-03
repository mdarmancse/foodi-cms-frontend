import { loginUserReducer } from "@/features/auth";
import { DashboardReducer } from "@/features/dashboard";
import { commonTableReducer } from "@/features/ui";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "../features/api/api-slice";
import { paginationReducer } from "./pagination-slice";
import storage from "redux-persist/lib/storage";
// import sessionStorage from "redux-persist/es/storage/session";
// import { CookieStorage } from "redux-persist-cookie-storage";
// import Cookies from "cookies-js";

const userDataPersistConfig = {
  key: "user",
  storage: storage,
};

export const store = configureStore({
  reducer: {
    userCredential: persistReducer(userDataPersistConfig, loginUserReducer),
    dashboard: DashboardReducer,
    pagination: paginationReducer,
    commonTable: commonTableReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
