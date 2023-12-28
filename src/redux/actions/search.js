import { addProperties, setPropertyData } from "@/redux/reducers/filterReducer";
import { addSearchData, call, getFilterData } from "@/services/api";
import store from "@/redux/store";

export const fetchSearchData = (data) => async (dispatch) => {
  try {
    const { cardPerChunk, chunkPerPage } = store.getState().filter;
    const res = await call(getFilterData(data));
    const payload = {
      properties: res.data,
      totalResults: res.total,
      isDataPending: cardPerChunk < res.total,
      curPage: 1,
      curChunk: 1,
      totalPages: Math.ceil(res.total / (cardPerChunk * chunkPerPage)),
      totalChunks: Math.ceil(res.total / cardPerChunk),
    };
    dispatch(setPropertyData(payload));
  } catch (err) {
    console.log(err);
  }
};

export const fetchMoreSearchData = () => async (dispatch) => {
  try {
    const {
      chunkPerPage,
      curChunk,
      curPage,
      urlParams,
      filterData,
      sort,
      totalChunks,
    } = store.getState().filter;
    const data = {
      page: (curPage - 1) * chunkPerPage + curChunk + 1,
      ...urlParams,
      ...filterData,
      sort,
    };

    const res = await call(getFilterData(data));
    const payload = {
      properties: res.data,
      isDataPending:
        curChunk + 1 < chunkPerPage &&
        chunkPerPage * (curPage - 1) + (curChunk + 1) < totalChunks,
      curChunk: curChunk + 1,
    };
    dispatch(addProperties(payload));
  } catch (err) {
    console.log(err);
  }
};

export const sendSearchData = async (data) => {
  try {
    await call(addSearchData(data));
  } catch (err) {
    console.log(err);
  }
};
