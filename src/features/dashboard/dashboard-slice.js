import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
});

export const DashboardReducer = dashboardSlice.reducer;
