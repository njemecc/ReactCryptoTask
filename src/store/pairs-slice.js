import { createSlice } from "@reduxjs/toolkit";

const pairsInitialState = {
  pairs: [
    {
      pair: "",
      chanId: 0,
      last_price: 0,
      daily_change: 0,
      daily_change_percent: 0,
      daily_high: 0,
      daily_low: 0,
    },
    {
      pair: "",
      chanId: 0,
      last_price: 0,
      daily_change: 0,
      daily_change_percent: 0,
      daily_high: 0,
      daily_low: 0,
    },
    {
      pair: "",
      chanId: 0,
      last_price: 0,
      daily_change: 0,
      daily_change_percent: 0,
      daily_high: 0,
      daily_low: 0,
    },
    {
      pair: "",
      chanId: 0,
      last_price: 0,
      daily_change: 0,
      daily_change_percent: 0,
      daily_high: 0,
      daily_low: 0,
    },
    {
      pair: "",
      chanId: 0,
      last_price: 0,
      daily_change: 0,
      daily_change_percent: 0,
      daily_high: 0,
      daily_low: 0,
    },
  ],
};

export const pairsSlice = createSlice({
  name: "pairs",
  initialState: pairsInitialState,
  reducers: {
    pairUpdate(state, payload) {
      state.pairs.map((pair) => {
        if (payload.payload[1]?.length == 10) {
          if (pair.chanId === payload.payload[0]) {
            pair["last_price"] = payload.payload[1][6];
            pair["daily_change"] = payload.payload[1][4];
            pair["daily_change_percent"] = payload.payload[1][5];
            pair["daily_high"] = payload.payload[1][8];
            pair["daily_low"] = payload.payload[1][9];
          }
        }
      });
    },
    pairInitialize(state, payload) {
      state.pairs = payload.payload;
    },
  },
});

export const pairsActions = pairsSlice.actions;
