import { createSlice } from "@reduxjs/toolkit";

const initState = {
  profile: {},
  isLoggedIn: false,
  isVerify: false,
  detailFormOpen: false,
  openLogout: false,
  authModel: null,
  draftData: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      if (action.payload?.id) {
        state.isLoggedIn = true;
        if (action.payload?.token) {
          localStorage.setItem("isLoggedin", true);
          localStorage.setItem("AUTH_TOKEN", action.payload?.token);
        }
      } else {
        state.isLoggedIn = false;
        localStorage.setItem("isLoggedin", false);
        localStorage.removeItem("AUTH_TOKEN");
      }
      state.isVerify = true;
    },
    setToken: (state, action) => {
      state.isVerify = true;
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedin", true);
      localStorage.setItem("AUTH_TOKEN", action.payload);
    },
    setVerify: (state, action) => {
      state.isVerify = true;
    },
    setDetailForm: (state, action) => {
      state.detailFormOpen = action.payload;
    },
    setLogoutModel: (state, action) => {
      state.openLogout = action.payload;
    },
    setAuthModel: (state, action) => {
      state.authModel = action.payload;
    },
    setDraftData: (state, action) => {
      state.authModel = action.payload.model;
      state.draftData = action.payload.data;
    },
  },
});

export const {
  setProfile,
  setToken,
  setVerify,
  setDetailForm,
  setLogoutModel,
  setAuthModel,
  setDraftData,
} = authSlice.actions;

export default authSlice.reducer;
