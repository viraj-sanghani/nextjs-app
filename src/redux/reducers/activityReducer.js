import { createSlice } from "@reduxjs/toolkit";
import { error, success } from "@/components/Toast";

const initState = {
  shortlistedArr: [],
  shortlisted: [],
  compareList: [],
  compareProperty: [],
  viewed: [],
  cardPerChunk: 20,
  chunkPerPage: 5,
  totalResults: 0,
  totalPages: 0,
  totalChunks: 0,
  isDataPending: true,
  curChunk: 1,
  curPage: 1,
};

export const activitySlice = createSlice({
  name: "activity",
  initialState: initState,
  reducers: {
    setShortlisted: (state, action) => {
      state.shortlisted = action.payload;
      state.shortlistedArr = action.payload.map((ele) => ele.id);
    },
    addToShortlist: (state, action) => {
      state.shortlisted = [action.payload, ...state.shortlisted];
      state.shortlistedArr = [action.payload.id, ...state.shortlistedArr];
    },
    removeFromShortlist: (state, action) => {
      state.shortlistedArr = state.shortlistedArr.filter(
        (ele) => ele != action.payload.id
      );
      state.shortlisted = state.shortlisted.filter(
        (ele) => ele.id != action.payload.id
      );
    },
    setviewed: (state, action) => {
      state.viewed = action.payload;
      // state.viewed = action.payload.data;
      // state.totalResults = action.payload.totalResults;
      // state.isDataPending = action.payload.isDataPending;
      // state.curPage = action.payload.curPage;
      // state.curChunk = action.payload.curChunk;
      // state.totalPages = action.payload.totalPages;
      // state.totalChunks = action.payload.totalChunks;
    },
    addviewed: (state, action) => {
      state.viewed = [action.payload, ...state.viewed];
      // state.viewed = [...state.viewed, ...action.payload.data];
      // state.isDataPending = action.payload.isDataPending;
      // state.curChunk = action.payload.curChunk;
    },
    setCurrentPage: (state, action) => {
      state.viewed = [];
      state.isDataPending = true;
      state.curPage = action.payload;
      state.curChunk = 1;
    },
    setInitCompare: (state, action) => {
      state.compareList = action.payload;
      state.compareProperty = action.payload.map((ele) => ele.id);
    },
    addToCompare: (state, action) => {
      if (state.compareList.length < 4) {
        const list = [...state.compareList, action.payload];
        localStorage.setItem("compare", JSON.stringify(list));
        state.compareList = list;
        state.compareProperty = list.map((ele) => ele.id);
        success("Item added to comparison list successfully!");
      } else {
        error("You can add maximum 4 property");
      }
    },
    removeFromCompare: (state, action) => {
      const list = state.compareList.filter(
        (ele) => ele.id != action.payload.id
      );
      localStorage.setItem("compare", JSON.stringify(list));
      state.compareList = list;
      state.compareProperty = list.map((ele) => ele.id);
      success("Item successfully removed.");
    },
    toggleCompare: (state, action) => {
      let list = state.compareList.filter((ele) => ele.id != action.payload.id);
      if (list.length === state.compareList.length) {
        if (state.compareList.length < 4) {
          list = [...state.compareList, action.payload];
          success("Item added to comparison list successfully!");
        } else {
          error("You can add maximum 4");
        }
      } else {
        success("Item successfully removed.");
      }
      localStorage.setItem("compare", JSON.stringify(list));
      state.compareList = list;
      state.compareProperty = list.map((ele) => ele.id);
    },
    removeAllFromCompare: (state, action) => {
      state.compareList = [];
      state.compareProperty = [];
      localStorage.removeItem("compare");
      success("All items have been successfully removed.");
    },
  },
});

export const {
  setShortlisted,
  addToShortlist,
  removeFromShortlist,
  setviewed,
  addviewed,
  setCurrentPage,
  setInitCompare,
  addToCompare,
  removeFromCompare,
  toggleCompare,
  removeAllFromCompare,
} = activitySlice.actions;

export default activitySlice.reducer;
