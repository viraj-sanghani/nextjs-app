import {
  addToShortlist,
  removeFromShortlist,
} from "../reducers/activityReducer";
import { addShortlisted, call, removeShortlisted } from "./../axios";

export const shortlistToggle = (data) => async (dispatch) => {
  try {
    if (data?.isShortlisted) {
      await call(removeShortlisted({ propertyId: data.id }));
      dispatch(removeFromShortlist({ id: data?.id }));
    } else {
      await call(addShortlisted({ propertyId: data.id }));
      dispatch(addToShortlist(data));
    }
  } catch (err) {
    console.log(err);
  }
};
