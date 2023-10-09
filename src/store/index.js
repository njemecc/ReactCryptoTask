import { configureStore } from "@reduxjs/toolkit";

//slices
import { pairsSlice } from "./pairs-slice";
import { authSlice } from "./auth-slice";
const store = configureStore({
  reducer: {
    pairs: pairsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
