import { createSlice } from "@reduxjs/toolkit";

const initState = {
  speechResult: "",
  listenerOpen: false,
  coords: { lati: null, long: null },
  locationOpen: false,
  shareURL: "",
  shareOpen: false,
  contactOpen: false,
  contactData: {},
  activePropOnMap: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState: initState,
  reducers: {
    setSpeechResult: (state, action) => {
      state.speechResult = action.payload;
    },
    setListenerOpen: (state, action) => {
      if (action.payload) {
        state.speechResult = "";
      }
      state.listenerOpen = action.payload;
    },
    setLocationResult: (state, action) => {
      state.coords = action.payload;
      state.locationOpen = false;
    },
    setLocationOpen: (state, action) => {
      state.locationOpen = action.payload;
    },
    setShare: (state, action) => {
      state.shareOpen = action.payload.open;
      state.shareURL = action.payload.open ? action.payload?.url : "";
    },
    setContact: (state, action) => {
      state.contactOpen = action.payload.open;
      state.contactData = action.payload.data;
    },
    setActiveOnMap: (state, action) => {
      state.activePropOnMap = action.payload;
    },
  },
});

export const {
  setSpeechResult,
  setListenerOpen,
  setLocationResult,
  setLocationOpen,
  setShare,
  setContact,
  setActiveOnMap,
} = appSlice.actions;

export default appSlice.reducer;
