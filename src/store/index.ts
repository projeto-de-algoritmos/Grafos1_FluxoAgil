import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/store/api";
import { mainSlice } from "@/store/slice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    main: mainSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
