import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metaData: {
    title: "",
    keyword: "",
    desc: "",
    image: "",
    url: "",
  },
};

export const seoSlice = createSlice({
  name: "seo",
  initialState,
  reducers: {
    setMetadata: (state, action) => {
      state.metaData = action.payload;
    },
  },
});

export const { setMetadata } = seoSlice.actions;
export default seoSlice.reducer;
