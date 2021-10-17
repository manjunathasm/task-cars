import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: "idle",
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCarData: (state, newState) => {
      state.data = [...newState.payload];
    },
    updateCarData: (state, newState) => {
      state.data = [...state.data, ...newState.payload];
    },
    clearCarData: (state) => {
      state.data = [];
    },
  },
});

export const { setCarData, updateCarData, clearCarData } = carSlice.actions;

export const selectCar = (state) => state.car.data;

export default carSlice.reducer;
