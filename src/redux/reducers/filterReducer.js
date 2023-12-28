import { createSlice } from "@reduxjs/toolkit";

const initState = {
  showFilter: false,
  filterData: {
    hideSeen: false,
    propertyType: [],
    bedRoom: [],
    constructionStatus: [],
    postBy: [],
    purchaseType: [],
    furnishing: [],
    budget: { min: null, max: null },
  },
  voiceData: {},
  searchType: { for: "buy", type: "residential" },
  isInit: false,
  properties: [],
  isFetching: true,
  sort: null,
  cardPerChunk: 20,
  chunkPerPage: 5,
  totalResults: 0,
  totalPages: 0,
  totalChunks: 0,
  isDataPending: true,
  curChunk: 1,
  curPage: 1,
  urlParams: {},
  viewType: "list",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initState,
  reducers: {
    setSearchType: (state, action) => {
      state.searchType.type = action.payload?.type || state.searchType.type;
      state.searchType.for = action.payload?.for || state.searchType.for;
    },
    setFilterInit: (state, action) => {
      state.isInit = action.payload;
    },
    setFilterData: (state, action) => {
      const data = { ...state.filterData, ...action.payload };
      state.filterData = data;
    },
    setVoiceData: (state, action) => {
      state.voiceData = action.payload;
    },
    setPropertyData: (state, action) => {
      state.properties = action.payload.properties;
      state.totalResults = action.payload.totalResults;
      state.isDataPending = action.payload.isDataPending;
      state.curPage = action.payload.curPage;
      state.curChunk = action.payload.curChunk;
      state.totalPages = action.payload.totalPages;
      state.totalChunks = action.payload.totalChunks;
      state.isFetching = false;
    },
    addProperties: (state, action) => {
      state.properties =
        state.curChunk === 0
          ? action.payload.properties
          : [...state.properties, ...action.payload.properties];
      state.isDataPending = action.payload.isDataPending;
      state.curChunk = action.payload.curChunk;
    },
    setCurrentPage: (state, action) => {
      // state.properties = [];
      state.isDataPending = true;
      state.curPage = action.payload;
      state.curChunk = 0;
    },
    toggleShortlist: (state, action) => {
      state.properties = state.properties.map((ele) => {
        if (ele.id == action.payload.id) {
          ele.isShortlisted = !ele.isShortlisted;
        }
        return ele;
      });
    },
    removePropertyData: (state, action) => {
      state.properties = null;
      state.urlParams = {};
      state.totalResults = 0;
      state.isDataPending = true;
      state.curPage = 1;
    },
    setUrlParams: (state, action) => {
      state.urlParams = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setViewType: (state, action) => {
      state.viewType = action.payload;
    },
    setShowFilter: (state, action) => {
      state.showFilter = action.payload;
    },
  },
});

export const {
  setSearchType,
  setFilterInit,
  setFilterData,
  setVoiceData,
  setPropertyData,
  addProperties,
  setCurrentPage,
  toggleShortlist,
  removePropertyData,
  setUrlParams,
  setSort,
  setViewType,
  setShowFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
