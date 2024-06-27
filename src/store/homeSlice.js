import { createSlice } from "@reduxjs/toolkit"; // reduces the boiler code of redux  https://redux-toolkit.js.org/api/createSlice

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {},
    genres: {},
  },
  reducers: {
    // reducer in slice is actually an object where keys are the action type and the values are the reducer functions
    getApiConfigurations: (state, action) => {
      state.url = action.payload;
    },
    getGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getApiConfigurations, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
