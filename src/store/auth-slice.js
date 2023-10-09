import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userLoggedIn: false,
  favorites: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    authPassed(state) {
      state.userLoggedIn = true;
    },
    addToFavorites(state, payload) {
      state.favorites = [...state.favorites, payload.payload];
      state.favorites = [].concat(...state.favorites);
      //imao sam problema sa nestovanjem lista pa sam ih ovako concatovao na prazan niz
    },
    removeFromFavorites(state, payload) {
      const unnestedFavorites = [].concat(...state.favorites);
      state.favorites = unnestedFavorites.filter(
        (omiljeni) => omiljeni.pair != payload.payload
      );
    },
  },
});

export const authActions = authSlice.actions;
