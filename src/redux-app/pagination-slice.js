import { createSlice } from "@reduxjs/toolkit";

const intitialState = {
  isActive: true,
  currentPage: 1,
  itemsPerPage: 10,
  id: null,
  items: [],
  totalItems: 0,
};

export const paginationSlice = createSlice({
  name: "pagination",
  initialState: intitialState,
  reducers: {
    changeActiveStatus: (state, action) => {
      state.isActive = action.payload;
    },
    changeCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    changeItemsPerPage(state, action) {
      console.log("pagination item", action.payload);
      state.itemsPerPage = action.payload;
    },
    changeId(state, action) {
      state.id = action.payload;
    },
    changePaginationState(state, action) {
      state.currentPage = action.payload.currentPage;
      state.items = action.payload.items;
      state.itemsPerPage = action.payload.itemsPerPage;
      state.totalItems = action.payload.totalItems;
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const {
  changeActiveStatus,
  changeCurrentPage,
  changeItemsPerPage,
  changeId,
  changePaginationState,
  changeFilter,
} = paginationSlice.actions;

export const paginationReducer = paginationSlice.reducer;
