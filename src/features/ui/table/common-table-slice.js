import { createSlice } from "@reduxjs/toolkit";
import { isEqual } from "lodash";

export const initialPaginationParams = {
  isActive: true,
  pageNumber: 1,
  itemsPerPage: 10,
};

const initialState = {
  ...initialPaginationParams,
  totalItems: 0,
  filter: {},
  path: "",
};

export const commonTableSlice = createSlice({
  name: "commonTableSlice",
  initialState,
  reducers: {
    changeCurrentPage(state, action) {
      state.pageNumber = action.payload;
    },
    changeItemsPerPage(state, action) {
      state.itemsPerPage = action.payload;
    },
    changeActiveStatus(state, action) {
      state.isActive = action.payload;
    },
    changePaginationParams(state, action) {
      state.pageNumber = action.payload.pageNumber;
      state.itemsPerPage = action.payload.itemsPerPage;
      state.totalItems = action.payload.totalItems;
      if (action.payload.filter) state.filter = action.payload.filter;
      if (action.payload.isActive) state.isActive = action.payload.isActive;
      if (action.payload.path) state.path = action.payload.path;
    },
    changeTableFilter(state, action) {
      if (!isEqual(state.filter, action.payload)) {
        state.filter = action.payload;
      }
    },
    changePath(state, action) {
      state.path = action.payload;
    },
  },
});

export const {
  changeCurrentPage,
  changeItemsPerPage,
  changeActiveStatus,
  changePaginationParams,
  changeTableFilter,
  changePath,
} = commonTableSlice.actions;
export const commonTableReducer = commonTableSlice.reducer;
