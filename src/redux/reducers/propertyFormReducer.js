import { createSlice } from "@reduxjs/toolkit";

const initState = { propertyId: "", data: {}, type: "", for: "Sale", step: 1 };

export const propertyFormSlice = createSlice({
  name: "propertyForm",
  initialState: initState,
  reducers: {
    setPropFormData: (state, action) => {
      const data = { ...state.data, ...action.payload };
      state.data = data;
    },
    setPropId: (state, action) => {
      state.propertyId = action.payload;
    },
    setPropType: (state, action) => {
      state.type = action.payload;
    },
    setPropFor: (state, action) => {
      state.for = action.payload;
    },
    setStep: (state, action) => {
      if (action.payload > 0 && action.payload <= 3) {
        state.step = action.payload;
        window.scrollTo({
          top: 0,
        });
      }
    },
  },
});

export const { setPropFormData, setPropType, setPropFor, setPropId, setStep } =
  propertyFormSlice.actions;

export default propertyFormSlice.reducer;
