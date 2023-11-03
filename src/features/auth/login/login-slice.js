import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  menu: [],
  permission: {},
  refreshToken: "",
  accessToken: "",
};

export const loginUserSlice = createSlice({
  name: "loginUserCredentials",
  initialState,
  reducers: {
    saveUserData: (state, action) => {
      state.user = action.payload?.user;
      state.permission = action.payload?.permission;
      state.menu = action.payload?.menu;
      state.refreshToken = action.payload?.refreshToken;
      state.accessToken = action.payload?.accessToken;
    },

    removeUser: (state, payload) => {
      state.user = {};
      state.menu = [];
      state.accessToken = "";
      state.refreshToken = "";
      state.permission = {};
    },
  },
});

export const { saveUserData, removeUser } = loginUserSlice.actions;

export const loginUserReducer = loginUserSlice.reducer;
