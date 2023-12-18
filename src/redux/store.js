import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appReducer";
import authReducer from "./reducers/authReducer";
import filterReducer from "./reducers/filterReducer";
import activityReducer from "./reducers/activityReducer";
import propertyFormReducer from "./reducers/propertyFormReducer";
import botReducer from "./reducers/botReducer";
import seoReducer from "./reducers/seoReducer";

const store = configureStore({
  reducer: {
    app: appReducer,
    bot: botReducer,
    auth: authReducer,
    filter: filterReducer,
    activity: activityReducer,
    propertyForm: propertyFormReducer,
    seo: seoReducer,
  },
});

export default store;
